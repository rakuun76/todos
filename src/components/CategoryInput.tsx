import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { customCategoriesState, categoryState } from "../atoms";

interface IForm {
  customCategory: string;
}

function CategoryInput() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>();
  const setCustomCategories = useSetRecoilState(customCategoriesState);
  const setCategory = useSetRecoilState(categoryState);

  const handleValid = ({ customCategory }: IForm) => {
    setCategory(customCategory as any);
    setCustomCategories((oldCategories) => {
      return [...oldCategories, customCategory];
    });
    setValue("customCategory", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("customCategory", {
          required: "Please write a Category",
        })}
        placeholder="Write a category"
      />
      <button>Add</button>
      <span>{errors.customCategory?.message}</span>
    </form>
  );
}

export default CategoryInput;
