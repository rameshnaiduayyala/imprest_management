import React, { useState, FormEvent } from 'react';
import ReusableTextField from "../../components/common/Texfiled";
import CustomButton from "../../components/common/Button";
import { Role } from "../../models/role.model";
import { createRole } from '../../services/role.svc';
import { useNavigate } from 'react-router-dom';
import "./role.css";

const AddRole: React.FC = () => {
    const navigate = useNavigate()
    const initialRoleState: Role = {
        name: '',
        description: '',
    };

    const [role, setRole] = useState<Role>(initialRoleState);
    const handleInputChange = (fieldName: string, value: string | Number) => {
        setRole({
            ...role,
            [fieldName]: value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const createdRole = await createRole(role);
        console.log(createRole, "createRole")
        if (createdRole) {
            navigate('/rolelist')
            console.log("role created succesfully")
        }
        setRole(initialRoleState)

    };

    const handleCancel = () => {
        setRole(initialRoleState);
    };

    return (
        <>
            <div className='main_role_container'>
                <div className='role_container'>
                    <h2 >Add Role</h2>
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

export default AddRole;