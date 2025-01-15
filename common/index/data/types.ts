export interface Business {
  id: string | number;
  name: string;
  description: string;
  logo?: string;
}

export interface Application {
  id: string | number;
  name: string;
  description: string;
  icon: string;
}

export interface SelectionState {
  selectedBusiness?: Business;
  selectedApplication?: Application;
}