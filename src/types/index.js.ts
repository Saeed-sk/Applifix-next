export interface SelectionOption {
    value: string;
    label: string;
}

export interface ServiceField {
    id: number;
    value: string;
    label: string;
    options: SelectionOption[];
}

export interface TravelServiceCategory {
    id: number;
    title: string;
    icon: string;
    fields?: ServiceField[];
}

export type TravelServiceList = TravelServiceCategory[];