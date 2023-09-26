export interface Contract {
  contractType: string;
  header: string;
  sections: Section[];
  inputFields: InputField[];
  id: string;
  fields: Array<{ label: string; value: string }>;
}

export interface Section {
  title: string | null;
  content: string;
}

export interface InputField {
  label: string;
  value: string;
}
