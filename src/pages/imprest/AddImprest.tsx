import { Grid, Box } from "@mui/material";
import { FormEvent, useState } from "react";
import ReusableTextField from "../../components/common/Texfiled";
import CustomButton from "../../components/common/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import "./Imprest.css";
import { Imprest } from "../../models/imprest.model";
import { createImprest } from "../../services/imprest.svc";
import AddToQueueIcon from '@mui/icons-material/AddToQueue';


const Addimprest = () => {
  const navigate = useNavigate();
  const initialImprestState: Imprest = {
    id: "",
    name: "",
    description: "",
    phone_number_1: "",
    extension_1: "",
    phone_number_2: "",
    extension_2: "",
  };

  const [imprests, setImprests] = useState<Imprest>(initialImprestState);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    phone_number_1: "",
    extension_1: "",
    phone_number_2: "",
    extension_2: "",
  });

  const handleChange = (name: string, value: string | number) => {
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

    setImprests((prevImprestData) => ({
      ...prevImprestData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...errors };

    if (!imprests.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!imprests.description) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    if (!imprests.phone_number_1) {
      newErrors.phone_number_1 = "Mobile Number 1 is required";
      isValid = false;
    }
    if (!imprests.extension_1) {
      newErrors.extension_1 = "Extension 1 is required";
      isValid = false;
    }
    if (!imprests.phone_number_2) {
      newErrors.phone_number_2 = "Mobile Number 2 is required";
      isValid = false;
    }
    if (!imprests.extension_2) {
      newErrors.extension_2 = "Extension 2 is required";
      isValid = false;
    }

    setErrors(newErrors);
    if (isValid) {
      const createdImprest = await createImprest(imprests);
      if (createdImprest) {
        navigate('/imprestlist')
      }
      setImprests(initialImprestState)
    }
  };

  const handleCancel = () => {
    navigate("/imprestlist");
  };

  return (
    <>
      <div className="top_title_buttons_area" style={{ display: 'flex' }}>
        <h2 className="page_main_title">
          Add Imprest
        </h2>
        <div>
          <div className="gen_buttons" style={{ paddingLeft: '50px' }}>
            <CustomButton
              className=""
              startIcon={<AddToQueueIcon />}
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
                value={imprests.name}
                onChange={(value) => handleChange("name", value)}
                name="Name"
                label={"Name"}
                type="text"
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                value={imprests.description as any}
                onChange={(value) => handleChange("description", value)}
                type="text"
                placeholder="description"
                label={"Description"}
                name="description"
                error={!!errors.description}
                helperText={errors.description}
                required
              />
            </Grid>

          </Grid>
          <Grid container className="inner_container" spacing={1}>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                placeholder="phone_number_1"
                value={imprests.phone_number_1 as any}
                onChange={(value) => handleChange("phone_number_1", value)}
                type="number"
                label={"Mobile Number 1"}
                name="phone_number_1"
                error={!!errors.phone_number_1}
                helperText={errors.phone_number_1}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                placeholder="extension 1"
                value={imprests.extension_1 as any}
                onChange={(value) => handleChange("extension_1", value)}
                type="number"
                label={"extension 1"}
                name="extension_1"
                error={!!errors.extension_1}
                helperText={errors.extension_1}
                required
              />
            </Grid>
          </Grid>
          <Grid container className="inner_container" spacing={1}>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                placeholder="Phone Number 2"
                value={imprests.phone_number_2 as any}
                type="number"
                onChange={(value) => handleChange("phone_number_2", value)}
                label={"Mobile Number 2"}
                name="Mobile Number 2"
                error={!!errors.phone_number_2}
                helperText={errors.phone_number_2}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="grid_item_space">
              <ReusableTextField
                placeholder="extension 2"
                value={imprests.extension_2 as any}
                type="number"
                onChange={(value) => handleChange("extension_2", value)}
                label={"extension 2"}
                name="extension_2"
                error={!!errors.extension_2}
                helperText={errors.extension_2}
                required
              />
            </Grid>

          </Grid>
          <Grid container className="inner_container" spacing={1}>

          </Grid>
        </div>
      </Box>
    </>
  );
};

export default Addimprest;