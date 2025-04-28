"use client";

import { useState } from "react";
import { ElementSteps } from "../../ui/element-steps";
import { IMockupFile, IVariant, PublishToStoreStep } from "@/types/IProduct";
import UploadMockup from "./UploadMockup";
import VariantForm from "./VariantForm";
import DescriptionForm from "./DescriptionForm";

const steps = [
  {
    id: PublishToStoreStep.product,
    title: "Products",
  },
  {
    id: PublishToStoreStep.variant,
    title: "Variant",
  },
  {
    id: PublishToStoreStep.description,
    title: "Description",
  },
  {
    id: PublishToStoreStep.publish,
    title: "Publish to Store",
  },
];

export default function PublishToStore() {
  const [currentStep, setCurrentStep] = useState(PublishToStoreStep.product);
  const [mockupFile, setMockupFile] = useState<IMockupFile | null>(null);
  const [mockups, setMockups] = useState<Array<IMockupFile>>([]);
  const [variantInfo, setVariantInfo] = useState<IVariant | null>(null);

  const handleNextStep = (values: IMockupFile | IVariant) => {
    if (currentStep === PublishToStoreStep.product) {
      setMockupFile(values as IMockupFile);
      setCurrentStep(PublishToStoreStep.variant);
      return;
    }

    if (currentStep === PublishToStoreStep.variant) {
      setVariantInfo(values as IVariant);
      setCurrentStep(PublishToStoreStep.description);
    }
  };

  return (
    <div>
      <ElementSteps
        steps={steps}
        currentStep={currentStep}
        onStepClick={(stepId) => setCurrentStep(stepId as PublishToStoreStep)}
        className="max-w-[700px]"
      />
      {currentStep === PublishToStoreStep.product && (
        <UploadMockup
          mockupFile={mockupFile}
          mockups={mockups}
          setMockups={setMockups}
          handleNextStep={handleNextStep}
        />
      )}
      {currentStep === PublishToStoreStep.variant && (
        <VariantForm
          variantInfo={variantInfo}
          mockupFile={mockupFile as IMockupFile}
          handleNextStep={handleNextStep}
        />
      )}
      {currentStep === PublishToStoreStep.description && (
        <DescriptionForm
          variantInfo={variantInfo}
          // mockupFile={mockupFile as IMockupFile}
          // handleNextStep={handleNextStep}
        />
      )}
    </div>
  );
}
