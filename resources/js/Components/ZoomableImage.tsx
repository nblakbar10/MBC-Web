import { getUniqueKey } from '@/Models/Helper';
import {
    BaseImageModel,
    getStorageImageUrl,
} from '@/Models/ImageModel';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { MapInteractionCSS } from 'react-map-interaction';

interface Props<T extends BaseImageModel> {
    img: T | string;
    title: string;
    onChange: (arg0: T) => void;
    className?: string;
}

export default function ZoomableImage<T extends BaseImageModel>(
    props: Props<T>,
) {
    let { title, onChange, className } = props;
    let model = {} as T;
    
    if (typeof props.img == 'string') {
        const path = props.img;
        if(path.startsWith('https://')) {
            model = {
                path: path,
                disk: "foreign",
                file: undefined,
            } as T;
        } else {
            model = {
                path: path,
                disk: 'public',
                file: undefined,
            } as T;
        }
    } else {
        model = props.img;
    }
    let image = getStorageImageUrl(model);

    function handleChange<T>(callback: (args0: T) => void) {
        return (e: T) => {
            callback(e);
            onChange({
                ...model,
            });
        };
    }

    const [isOpen, setIsOpen] = useState(false)

    if (image != undefined) {
        return (
            <div className="flex justify-center">
                <img
                    src={image}
                    className={className ?? 'object-cover h-80 rounded-lg'}
                    onClick={handleChange(_ => {
                        setIsOpen(true);
                    })}
                />
                <Modal
                    id={`image-${getUniqueKey(model)}-modal`}
                    open={isOpen}
                    onClose={handleChange(_ => setIsOpen(false))}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    disableScrollLock={true}
                >
                    <Box
                        sx={{
                            position: 'absolute' as 'absolute',
                            top: '50%',
                            left: '50%',
                            width: '80%',
                            height: '95%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            gutterBottom
                        >
                            {title}
                        </Typography>

                        <MapInteractionCSS>
                            <div className="flex items-center ">
                                <img
                                    className="flex-1"
                                    id="modal-modal-description"
                                    src={image}
                                    onDoubleClick={handleChange(_ => {
                                        setIsOpen(false)
                                    })}
                                />
                            </div>
                        </MapInteractionCSS>
                    </Box>
                </Modal>
            </div>
        );
    } else {
        return null;
    }
}
