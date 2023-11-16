import React, { useState, FormEvent } from 'react';
import ReusableTextField from "../../components/common/Texfiled";
import CustomButton from "../../components/common/Button";
import { Role } from "../../models/role.model";
import { createRole, getRoles } from '../../services/role.svc';
import { useNavigate } from 'react-router-dom';
import "./role.css";
import { Box, Grid } from '@mui/material';
import CoPresentIcon from "@mui/icons-material/CoPresent";
import CancelIcon from "@mui/icons-material/Cancel";
import { ToastContainer, toast } from 'react-toastify';

const AddRole: React.FC = () => {
    const navigate = useNavigate();
    const initialRoleState: Role = {
        name: '',
        description: '',
    };

    const [role, setRole] = useState<Role>(initialRoleState);
    const [errors, setErrors] = useState<Role>(initialRoleState);

    const handleInputChange = (fieldName: string, value: string) => {

        setRole({
            ...role,
            [fieldName]: value
        })
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let isValid = true;

        const newErrors = { ...initialRoleState } as any;
        for (const key in role) {
            if (role.hasOwnProperty(key)) {
                if (role[key as keyof Role] === "") {
                    newErrors[key as keyof Role] = "This field is required.";
                    isValid = false;
                }
            }
        }

        setErrors(newErrors);

        if (isValid) {
            const roles: Role[] = await getRoles();
            const roleExists = roles.some((r) => r.name === role.name)
            if (roleExists) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    name: "Role Name already exists"
                }));
            } else {
                try {
                    const createdRole = await createRole(role);
                    if (createdRole) {
                        toast.success("Role Created");
                        setTimeout(() => {
                            navigate('/rolelist');
                        }, 1000);
                    }
                    setRole(initialRoleState)
                    setErrors(initialRoleState)
                } catch (error) {
                    console.error("Error creating role:", error);

                }
            }
        }
    }

    const handleCancel = () => {
        navigate("/rolelist");
    };

    return (

        <>
            <ToastContainer />
            <div className="top_title_buttons_area" style={{ display: 'flex' }}>
                <h2 className="page_main_title">
                    Add Role
                </h2>
                <div>
                    <div className="gen_buttons" style={{ paddingLeft: '50px' }}>
                        <CustomButton
                            className=""
                            startIcon={<CoPresentIcon />}
                            type="submit"
                            onClick={(e) => handleSubmit(e as any)}
                        >
                            <span>Submit</span>
                        </CustomButton>
                        <CustomButton
                            className=""
                            startIcon={<CancelIcon className="button_icon" />}
                            onClick={handleCancel}
                        >
                            <span>Cancel</span>
                        </CustomButton>
                    </div>
                </div>
            </div>
            <Box
                className="common_container"
                component="form"
            >
                <div className="outer_container">
                    <Grid container className="inner_container" spacing={1}>
                        <Grid item xs={12} sm={6} md={3} className="grid_item_space">
                            <ReusableTextField
                                type="text"
                                label="Role"
                                value={role.name}
                                onChange={(value: any) => handleInputChange("name", value)}
                                name="name"
                                error={!!errors.name}
                                helperText={errors.name}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} className="grid_item_space">
                            <ReusableTextField
                                type="text"
                                label="Description"
                                value={role.description}
                                onChange={(value: any) => handleInputChange('description', value)}
                                name="description"

                                error={!!errors.description}
                                helperText={errors.description}
                                required
                            />
                        </Grid>
                    </Grid>
                </div>
            </Box>
        </>

    );
}

export default AddRole
