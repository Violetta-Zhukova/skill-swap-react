import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  ISkillCategory,
  ISubcategory,
  IUploadedFile,
} from "../../entities/types";

type TRegForm = {
  email: string | null;
  password: string | null;
  name: string | null;
  borndate: string | null;
  sex: "male" | "female" | null;
  city: string | null;
  categoryWantToLearn: ISkillCategory | null;
  subcategoryWantToLearn: ISubcategory | null;
  skillCanTeach: {
    name: string | null;
    category: ISkillCategory | null;
    subcategory: ISubcategory | null;
    description: string | null;
    images: IUploadedFile[];
  };
};

type TFormsSliceState = {
  reg: TRegForm;
};

const initialState: TFormsSliceState = {
  reg: {
    email: null,
    password: null,
    name: null,
    borndate: null,
    sex: null,
    city: null,
    categoryWantToLearn: null,
    subcategoryWantToLearn: null,
    skillCanTeach: {
      name: null,
      category: null,
      subcategory: null,
      description: null,
      images: [],
    },
  },
};

export const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    setRegFormState: (state, action: PayloadAction<Partial<TRegForm>>) => {
      state.reg = { ...state.reg, ...action.payload };
    },
  },
});

export const { setRegFormState } = formsSlice.actions;
