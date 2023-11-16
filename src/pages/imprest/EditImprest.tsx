import { Grid, Box } from "@mui/material";
import { useEffect, useState } from "react";
import Dropdown from "../../components/common/Dropdown";
import ReusableTextField from "../../components/common/Texfiled";
import CustomButton from "../../components/common/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate, useParams } from "react-router-dom";
import StoreIcon from '@mui/icons-material/Store';
import { Imprest } from "../../models/imprest.model";
import { getImprestrById, updateImprest } from "../../services/imprest.svc";

import { ToastContainer, toast } from "react-toastify";

const EditImprest = () => {
  const imprestStatus = [
    { name: "Active", value: "true" },
    { name: "Inactive", value: "false" },
  ];
  const { id } = useParams();
  const imprestId = id ? parseInt(id) : -1;

  const initialImprestState: Imprest = {
    name: "",
    description: "",
    phone_number_1: "",
    extension_1: "",
    phone_number_2: "",
    extension_2: "",
    hospital_id: "",
    active: false,
  };
  const [imprest, setImprest] = useState<Imprest>(initialImprestState);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    phone_number_1: "",
    extension_1: "",
    phone_number_2: "",
    extension_2: "",
  });

  const handleChange = (name: string, value: string | number | boolean) => {
    if (name === "phone_number_1" || name === "phone_number_2") {
      if (!/^\d{10}$/.test(value.toString())) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Mobile number must be exactly 10 digits long.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }

    setImprest((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const isValid = !Object.values(errors).some((error) => !!error);

    if (isValid) {
      try {
        const UpdatedImprest = await updateImprest(imprestId, imprest);
        if (UpdatedImprest) {
          setImprest(imprest);
        }
        toast.success("Imprest Edited");
        setTimeout(() => {
          navigate('/imprestlist');
        }, 1500);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCancel = () => {
    navigate("/imprestlist");
  };

  // get one Imprest
  useEffect(() => {
    if (imprestId !== -1) {
      loadOneImprest(imprestId);
    }
  }, [imprestId]);

  const loadOneImprest = async (imprestId: number) => {
    try {
      const oneImprest = await getImprestrById(imprestId);
      setImprest(oneImprest as any);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="top_title_buttons_area" style={{ display: 'flex' }}>
        <h2 className="page_main_title">
          Edit Imprest
        </h2>
        <div>
          <div className="gen_buttons" style={{ paddingLeft: '50px' }}>
            <CustomButton
              startIcon={<StoreIcon />}
              type="submit"
              onClick={handleSubmit}
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
      <Box className="common_container">
        <div className="outer_container">
          <Grid container className="inner_container" spacing={1}>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                value={imprest.name}
                onChange={(value) => handleChange("name", value)}
                name="Name"
                label={"Name"}
                type="text"
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                value={imprest.description as any}
                onChange={(value) => handleChange("description", value)}
                type="text"
                placeholder="description"
                label={"Description"}
                name="description"
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                placeholder="phone_number_1"
                value={imprest.phone_number_1 as any}
                onChange={(value) => handleChange("phone_number_1", value)}
                type="number"
                label={"Mobile Number 1"}
                name="phone_number_1"
                error={!!errors.phone_number_1}
                helperText={errors.phone_number_1}
              />
            </Grid>
          </Grid>
          <Grid container className="inner_container" spacing={1}>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                placeholder="extension 1"
                value={imprest.extension_1 as any}
                onChange={(value) => handleChange("extension_1", value)}
                type="number"
                label={"extension 1"}
                name="extension_1"
                error={!!errors.extension_1}
                helperText={errors.extension_1}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                placeholder="Phone Number 2"
                value={imprest.phone_number_2 as any}
                type="number"
                onChange={(value) => handleChange("phone_number_2", value)}
                label={"Mobile Number 2"}
                name="Mobile Number 2"
                error={!!errors.phone_number_2}
                helperText={errors.phone_number_2}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                placeholder="extension 2"
                value={imprest.extension_2 as any}
                type="number"
                onChange={(value) => handleChange("extension_2", value)}
                label={"extension 2"}
                name="extension_2"
                error={!!errors.extension_2}
                helperText={errors.extension_2}
              />
            </Grid>
          </Grid>
          <Grid container className="inner_container" spacing={1}>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <Dropdown
                name="Imprest Status"
                options={imprestStatus}
                value={imprest.active as any}
                onChange={(value) => handleChange("active", value)}
              />
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
};

export default EditImprest;
