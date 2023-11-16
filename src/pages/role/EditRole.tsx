import React, { useState, FormEvent, useEffect } from 'react';
import ReusableTextField from "../../components/common/Texfiled";
import CustomButton from "../../components/common/Button";
import { Role } from "../../models/role.model";
import { getRoleById, updateRole } from '../../services/role.svc';
import CoPresentIcon from "@mui/icons-material/CoPresent";
import CancelIcon from "@mui/icons-material/Cancel";

import "./role.css";
import { Box, Grid } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
interface EditRoleProps {
    id: number;
    onClose: () => void;
}
const EditRole: React.FC<EditRoleProps> = ({ id, onClose }) => {
    const initialRoleState: Role = {
        name: '',
        description: '',
        id: ''
    };

    const [role, setRole] = useState<Role>(initialRoleState);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({
        name: '',
        description: '',
    });

    useEffect(() => {
        if (id) {
            loadRole(id);
        }
    }, [id]);

    const loadRole = async (roleId: number) => {
        const oneRole = await getRoleById(roleId);
        setRole(oneRole);
    }

    const handleInputChange = (fieldName: string, value: string | Number) => {
        setRole({
            ...role,
            [fieldName]: value,
        });
        if (fieldName in formErrors) {
            setFormErrors({
                ...formErrors,
                [fieldName]: '',
            });
        }
    };

    const validateForm = () => {
        const errors: { [key: string]: string } = {};
        if (role.name.trim() === '') {
            errors.name = 'Role name is required';
        }
        if (role.description.trim() === '') {
            errors.description = 'Description is required';
        }
        return errors;
    };
    const handleCancel = () => {
        onClose()
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            const updatedRole = await updateRole(id, role);
            if (updatedRole) {
                setRole(updatedRole);
            }
            setRole(initialRoleState);
            toast.success("Edited Success");
            setTimeout(() => {
                onClose();
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="top_title_buttons_area" style={{ display: 'flex' }}>
                <h2 className="page_main_title">Edit Role</h2>
                <div>
                    <div className="gen_buttons" style={{ paddingLeft: '50px' }}>
                        <CustomButton
                            className=""
                            startIcon={<CoPresentIcon />}
                            onClick={(e) => handleSubmit(e as any)}
                            type="submit"
                        >
                            <span>Submit</span>
                        </CustomButton>
                        <CustomButton
                            className=""
                            startIcon={<CancelIcon />}
                            onClick={handleCancel}
                        >
                            <span>Cancel</span>

                        </CustomButton>
                    </div>
                </div>
            </div>
            <Box className="common_container" component="form">
                <div className="outer_container">
                    <Grid container className="inner_container" spacing={1}>
                        <Grid item xs={12} sm={6} md={3} className="grid_item_space">
                            <ReusableTextField
                                type="text"
                                label="Role"
                                value={role.name}
                                onChange={(value) => handleInputChange('name', value)}
                                name="name"
                                helperText={formErrors.name}
                                error={Boolean(formErrors.name)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} className="grid_item_space">
                            <ReusableTextField
                                type="text"
                                label="Description"
                                value={role.description}
                                onChange={(value) => handleInputChange('description', value)}
                                name="description"
                                helperText={formErrors.description}
                                error={Boolean(formErrors.description)}
                            />
                        </Grid>
                    </Grid>
                </div>
            </Box>
        </>
    )
}

export default EditRole;
