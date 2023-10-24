export type FormData = Record<string, string>;

export interface Section {
  id: string;
  title: string | null;
  content: string;
  inputFields: Record<string, { label: string } | undefined>;
}


export interface InputField {
  label: string;
  value: string;
  id: string;
}

export interface Contract {
  contractType: string;
  header: string;
  sections: Section[];
  inputFields: InputField[];
  id: string;
  content: string;
  fields: Array<{ label: string; value: string }>;
}

export interface ContractData {
  header: string;
  content: string;
  sections: Section[];
}

