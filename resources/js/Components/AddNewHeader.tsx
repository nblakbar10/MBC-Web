import React, { MouseEventHandler, ReactNode } from 'react';

interface Props {
    title: ReactNode;
    onClick: MouseEventHandler;
    id: string;
    newIcon?: ReactNode;
    titleIcon?: ReactNode;
}
export default function AddNewHeader(props: Props) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <label htmlFor={props.id}>
                {props.titleIcon || null} {props.title}
            </label>
            <div className="flex justify-end">
                <button
                    id={props.id}
                    type="button"
                    className="btn btn-primary"
                    onClick={props.onClick}
                >
                    {props.newIcon || null} Add New
                </button>
            </div>
        </div>
    );
}
