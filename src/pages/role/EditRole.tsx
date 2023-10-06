import React, { useState, FormEvent, useEffect } from 'react';
import ReusableTextField from "../../components/common/Texfiled";
import CustomButton from "../../components/common/Button";
import { Role } from "../../models/role.model";
import { useNavigate, useParams } from 'react-router-dom';
import { RoleDataById, updateRole } from '../../services/role.svc';
import "./role.css"

const EditRole: React.FC = () => {
    const initialRoleState: Role = {
        name: '',
        description: '',
    };

    const [role, setRole] = useState<Role>(initialRoleState);
    const navigte = useNavigate();
    const { id } = useParams<{ id: string | undefined }>();
    const roleId = id ? parseInt(id, 10) : -1
    // loading single role data
    useEffect(() => {
        if (roleId !== -1) {
            loadRole(roleId);
        }
    }, [roleId]);

    const loadRole = async (roleId: number) => {
        const response = await RoleDataById(roleId);
        console.log(response.data, "edit")
        setRole(response.data)
    }

    const handleInputChange = (fieldName: string, value: string | Number) => {
        setRole({
            ...role,
            [fieldName]: value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>,) => {
        e.preventDefault();
        try {
            const response = await updateRole(roleId, role);
            if (response.data === 204) {
                setRole(response.data)
            }
            setRole(initialRoleState);
            navigte('/rolelist')
        } catch (error) {
            console.log(error)
        }
    };

    const handleCancel = () => {
        setRole(initialRoleState);
    };
    return (
        <>
            <div className='main_role_container'>
                <div className='role_container'>
                    <h2 >Edit Role</h2>
                    <div className='horizontal_line '></div>
                    <form onSubmit={handleSubmit}>
                        <div className='add_role_text'>

                            <ReusableTextField
                                type="text"
                                label="Role"
                                value={role.name}
                                onChange={(value) => handleInputChange('name', value)}
                                name="name"
                            />
                            <ReusableTextField
                                type="text"
                                label="Description"
                                value={role.description}
                                onChange={(value) => handleInputChange('description', value)}
                                name="description"
                            />
                        </div>
                        <div>
                            <CustomButton type="submit">Submint</CustomButton>
                            <CustomButton onClick={handleCancel}>Cancel</CustomButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditRole;