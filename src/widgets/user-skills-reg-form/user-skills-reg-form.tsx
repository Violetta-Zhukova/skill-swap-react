import { useEffect, useMemo, type FC } from "react";
import {
  Controller,
  useForm,
  useWatch,
  type SubmitHandler,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./user-skills-reg-form.module.css";
import { Button } from "../../shared/ui/Button/Button";
import { Input } from "../../shared/ui/Input";
import { DropdownComponent } from "../../shared/ui/dropdown";
import { useSelector } from "../../features/store";
import { categoriesSelector } from "../../features/categories/categoriesSlice";
import ImageUploader, {
  type IUploadedFile,
} from "../image-upload-widget/image-upload-widget";

const skillsSchema = yup.object({
  name: yup
    .string()
    .required("Навык обязателен для заполнения")
    .matches(
      /^[а-яА-ЯёЁ\s-]+$/,
      "Навык может содержать только кириллические символы, пробелы и дефис",
    ),
  category: yup.string().required("Категория обязательна для заполнения"),
  subCategory: yup.string().required("Подкатегория обязательна для заполнения"),
  fullDescription: yup
    .string()
    .required("Описание обязательно для заполнения")
    .matches(
      /^[а-яА-ЯёЁ\s-]+$/,
      "Навык может содержать только кириллические символы, пробелы и дефис",
    ),
  images: yup
    .array()
    .of(yup.mixed<IUploadedFile>())
    .min(1, "Загрузите хотя бы одно изображение")
    .required("Изображения обязательны"),
});

type TUserSkills = yup.InferType<typeof skillsSchema>;

export const UserSkillsRegForm: FC = () => {
  const categories = useSelector(categoriesSelector);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    watch,
    formState: { errors, isValid },
  } = useForm<TUserSkills>({
    resolver: yupResolver(skillsSchema),
    defaultValues: {
      name: "",
      category: "",
      subCategory: "",
      fullDescription: "",
      images: [],
    },
    mode: "onChange",
  });

  const selectedCategory = useWatch({
    control,
    name: "category",
    defaultValue: "",
  });

  const selectedSubCategory = useWatch({
    control,
    name: "subCategory",
    defaultValue: "",
  });

  const availableSubcategories = useMemo(() => {
    if (!selectedCategory) {
      return [];
    }

    const selectedCategoryData = categories.find(
      (category) => selectedCategory === category.name,
    );

    return selectedCategoryData?.subcategories || [];
  }, [selectedCategory, categories]);

  useEffect(() => {
    if (selectedSubCategory && selectedCategory) {
      const isValidSubCategory = availableSubcategories.some(
        (sub) => sub.name === selectedSubCategory,
      );

      if (!isValidSubCategory) {
        setValue("subCategory", "", { shouldValidate: true });
      }
    }
  }, [selectedCategory, selectedSubCategory, availableSubcategories, setValue]);

  const onSubmit: SubmitHandler<TUserSkills> = (data) => {
    console.log("Отправленные данные:", data);
  };

  const handleFilesUploaded = (files: IUploadedFile[]) => {
    setValue("images", files, { shouldValidate: true });
    trigger("images");
  };

  const imagesValue = watch("images");
  const handleFileRemoved = (removedFile: IUploadedFile) => {
    const currentFiles = imagesValue as IUploadedFile[];
    const newFiles = currentFiles.filter((item) => item.id !== removedFile.id);
    setValue("images", newFiles, { shouldValidate: true });
    trigger("images");
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              value={field.value}
              placeholder={"Введите название вашего навыка"}
              label={"Название навыка"}
              onChange={(e) => {
                field.onChange(e.target.value);
                trigger("name");
              }}
              isError={!!fieldState.error}
              hint={fieldState.error?.message}
            />
          )}
        />

        <label className={styles.label}>
          Категория навыка
          <Controller
            name="category"
            control={control}
            render={({ field, fieldState }) => (
              <DropdownComponent
                {...field}
                options={categories}
                placeholder={"Выберите категорию навыка"}
                required={false}
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  trigger("category");
                  if (value !== selectedCategory) {
                    setValue("subCategory", "", { shouldValidate: true });
                  }
                }}
                error={fieldState.error?.message}
              />
            )}
          />
        </label>

        <label className={styles.label}>
          Подкатегория навыка
          <Controller
            name="subCategory"
            control={control}
            render={({ field, fieldState }) => (
              <DropdownComponent
                {...field}
                options={availableSubcategories}
                placeholder={
                  !selectedCategory
                    ? "Сначала выберите категорию"
                    : "Выберите подкатегорию навыка"
                }
                required={false}
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  trigger("subCategory");
                }}
                error={fieldState.error?.message}
                disabled={!selectedCategory}
              />
            )}
          />
        </label>

        <label className={styles.label}>
          Описание
          <textarea
            {...register("fullDescription", { required: true })}
            rows={3}
            placeholder={"Коротко опишите, чему можете научить"}
            className={`${styles.textarea}  ${errors.fullDescription ? styles.textarea_error : ""}`}
          ></textarea>
          {errors.fullDescription && (
            <span className={styles.error}>
              {errors.fullDescription.message}
            </span>
          )}
        </label>

        <div>
          <ImageUploader
            onFilesUploaded={handleFilesUploaded}
            onFileRemoved={handleFileRemoved}
          />
          {errors.images && (
            <span className={styles.error}>{errors.images.message}</span>
          )}
        </div>

        <div className={styles.button_section}>
          <Button fullWidth onClick={() => {}} type="secondary">
            Назад
          </Button>
          <Button disabled={!isValid} fullWidth onClick={() => {}}>
            Продолжить
          </Button>
        </div>
      </form>
    </div>
  );
};
