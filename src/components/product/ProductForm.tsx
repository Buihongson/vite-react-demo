import { useEffect, useState } from "react";
import { useForm, Control, useFieldArray, FormProvider } from "react-hook-form";
import Button from "../ui/button/Button";
import { IOptionSchema, IProduct } from "../../types/IProduct";
import InputController from "../form/controller/InputController";
import TextAreaController from "../form/controller/TextAreaController";
import { useQueryGetCategories, useQueryGetProductType } from "../../services";
import { IOptionSelect } from "../../types";
import SelectController from "../form/controller/SelectController";
import ProductImageController from "./ProductImageController";
import VariantForm from "./VariantForm";

export type ProductTypeOption = IOptionSelect & {
  optionSchema: Array<IOptionSchema>;
};

interface IProductFormProps {
  productDetail?: IProduct | null;
  handleRefetchData?: () => void;
}

export default function ProductForm({ productDetail }: IProductFormProps) {
  const [selectedProductType, setSelectedProductType] =
    useState<ProductTypeOption | null>(null);
  const [productTypeOption, setProductTypeOption] = useState<
    Array<ProductTypeOption>
  >([]);
  const [categoriesOption, setCategoriesOption] = useState<
    Array<IOptionSelect>
  >([]);
  const { data: productTypeData } = useQueryGetProductType();
  const { data: categoriesData } = useQueryGetCategories({});

  const methods = useForm<IProduct>({
    defaultValues: {
      title: "",
      description: "",
      categories: [],
      tags: [],
      images: [],
      thumbnail: [],
      variants: [],
    },
  });
  const { control, reset, handleSubmit } = methods;
  const { append } = useFieldArray({
    control: control,
    name: "variants",
  });

  useEffect(() => {
    if (productTypeData?.data) {
      setProductTypeOption(
        productTypeData.data.map((item) => ({
          label: item.name,
          value: item._id,
          optionSchema: item.optionSchema,
        }))
      );
    }
  }, [productTypeData?.data]);

  useEffect(() => {
    if (categoriesData?.data) {
      setCategoriesOption(
        categoriesData.data.map((item) => ({
          label: item.title,
          value: item._id as string,
        }))
      );
    }
  }, [categoriesData?.data]);

  useEffect(() => {
    if (productDetail) {
      reset({
        title: productDetail.title,
        description: productDetail.description,
        categories: productDetail.categories,
        tags: productDetail.tags,
        images: productDetail.images,
        thumbnail: productDetail.thumbnail,
        productTypeId: productDetail.productTypeId,
        price: productDetail.price,
      });

      // Set selected product type if it exists
      if (productDetail.productTypeId && productTypeOption.length > 0) {
        const selectedType = productTypeOption.find(
          (option) => option.value === productDetail.productTypeId
        );
        if (selectedType) {
          setSelectedProductType(selectedType);
        }
      }
    }
  }, [productDetail, productTypeOption]);

  const onSubmit = (values: IProduct) => {
    console.log("🚀 ~ onSubmit ~ values:", values);
  };

  const handleProductTypeSelect = (
    selectedOption: ProductTypeOption | null
  ) => {
    if (selectedOption) {
      const variantsOption: Record<string, string> = {};
      selectedOption.optionSchema.forEach((item) => {
        variantsOption[item.name] = "";
      });

      //   remove();
      setSelectedProductType(selectedOption);
      append({
        optionValues: { ...variantsOption },
        price: { base: 0, profit: 0, sale: 0 },
        quantity: 0,
        weight: 0,
        dimensions: { length: 0, width: 0, height: 0 },
      });
    } else {
      setSelectedProductType(null);
    }
  };

  // Render dynamic form fields based on selected product type
  const renderDynamicFields = () => {
    if (!selectedProductType) return null;

    return <VariantForm selectedProductType={selectedProductType} />;
  };

  return (
    <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-6">
      <FormProvider {...methods}>
        <form className="flex flex-col">
          <div className="px-2 overflow-y-auto custom-scrollbar">
            <InputController
              control={control}
              name="title"
              label="Title"
              required
              containerClassName="mb-3"
            />
            <TextAreaController
              control={control}
              name="description"
              label="Description"
              required
              containerClassName="mb-3"
            />
            <div className="mb-3">
              <label className="form-label text-neutral-700 dark:text-neutral-100">
                Price
                <sup className="text-red-600 ml-1">*</sup>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <InputController
                  control={control}
                  name="price.base"
                  label="Base"
                  labelClassName="text-sm"
                  required
                />
                <InputController
                  control={control}
                  name="price.profit"
                  label="Profit"
                  labelClassName="text-sm"
                />
              </div>
            </div>
            <SelectController
              control={control as unknown as Control<Record<string, unknown>>}
              name="productTypeId"
              label="Product Type"
              options={productTypeOption}
              onChange={(e) => {
                handleProductTypeSelect(e);
              }}
              containerClassName="mb-3"
            />

            {/* Dynamic fields based on product type */}
            {renderDynamicFields()}

            <SelectController
              control={control as unknown as Control<Record<string, unknown>>}
              name="categories"
              label="Categories"
              options={categoriesOption}
              isMulti
              required
              containerClassName="mb-3"
            />
            <InputController
              control={control}
              name="tags"
              label="Tags"
              required
              containerClassName="mb-3"
            />
            <ProductImageController
              control={control}
              name="thumbnail"
              label="Thumbnail"
              required
              containerClassName="mb-3"
              maxFiles={1}
            />
            <ProductImageController
              control={control}
              name="images"
              label="Product image"
              required
              containerClassName="mb-3"
              maxFiles={10}
            />
            <div id="variants" />
          </div>
        </form>
      </FormProvider>
      <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
        <Button size="sm" variant="outline">
          Cancel
        </Button>
        <Button size="sm" onClick={handleSubmit(onSubmit)}>
          Save
        </Button>
      </div>
    </div>
  );
}
