import React, {DetailedHTMLProps, HTMLAttributes} from "react";

export interface TrackProgressProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    initialValue: number;
    onChangeEvent: (value: number) => void;
    max: number;
    type: 'time' | 'percent';
}