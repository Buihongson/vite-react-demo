import React, { forwardRef, useImperativeHandle, useRef, ForwardRefRenderFunction } from "react";
import { Editor as TinyEditor, IAllProps } from "@tinymce/tinymce-react";
import { config } from "@/constants/config";

export interface EditorRef {
  getContent: () => string | undefined;
}

interface EditorInstance {
  getContent: () => string;
}

export interface EditorProps extends Omit<IAllProps, "onEditorChange"> {
  onChange?: (content: string) => void;
}

const Editor: ForwardRefRenderFunction<EditorRef, EditorProps> = ({ onChange, ...props }, ref) => {
  const editorRef = useRef<EditorInstance | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      getContent: () => {
        if (editorRef.current) {
          return editorRef.current.getContent();
        }
        return undefined;
      },
    }),
    [editorRef]
  );

  return (
    <>
      <TinyEditor
        apiKey={config.env.tinyApiKey}
        onInit={(evt, editor) => (editorRef.current = editor as unknown as EditorInstance)}
        init={{
          height: 350,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks fontfamily fontsize | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          language: "en",
          elementpath: false,
          branding: false,
          //   file_picker_callback: (cb, value, meta) => {
          //     const input = document.createElement("input");
          //     input.setAttribute("type", "file");
          //     input.setAttribute("accept", "image/*");

          //     input.addEventListener("change", async (e) => {
          //       const file = e.target.files[0];
          //       const data = new FormData();

          //       data.append("imageFile", file);

          //       if (data) {
          //         await uploadThumbnailSystem(data)
          //           .then((res) => {
          //             const imageUrl = res?.data?.imageUrl;
          //             const fullImageUrl = `${ROOT_API}${imageUrl}`;
          //             cb(fullImageUrl, { title: file.name });
          //           })
          //           .catch((error) => {
          //             toast({
          //               title:
          //                 error?.response?.data?.errors?.[0]?.msg ||
          //                 error?.response?.data?.msg ||
          //                 `Tải file không thành công`,
          //               status: "error",
          //               duration: 9000,
          //               isClosable: true,
          //             });
          //           });
          //       }
          //     });
          //     input.click();
          //   },
        }}
        onEditorChange={onChange}
        {...props}
      />
    </>
  );
};

export default forwardRef(Editor);
