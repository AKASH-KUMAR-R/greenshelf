import React, { useState } from 'react';
import {
   Card,
   Input,
   Button,
   Typography,
 } from "@material-tailwind/react";

const RequestItem = () => {

    const [formData, setFormData] = useState({
      owner_uname: '',
      prod_desc: '',
      item: '',
      phone_no: '',
    });
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();

      fetch("http://localhost:4050/requestItem", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
       
      })
      console.log(formData);
    };
  
    return (
      <div className=" h-screen w-full  flex justify-center items-center bg-blue-gray-100 p-4">
      <Card className= 'contribute-section p-10 h-4/5' shadow={false}>
        <Typography variant="h4" color="blue-gray">
            Request item
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Fill the form 
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-4">
              Your Name
            </Typography>
            <Input
              required
              name="owner_uname"
              value={formData.owner_uname}
              onChange={handleInputChange}
              size="lg"
              placeholder="Name"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />
            <Typography variant="h6" color="blue-gray" className="-mb-4">
              Item Name
            </Typography>
            <Input
              required
              name="item"
              value={formData.item}
              onChange={handleInputChange}
              size="lg"
              placeholder="Description"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />
            <Typography variant="h6" color="blue-gray" className="-mb-4">
              Description of the item
            </Typography>
            <Input
              required
              name="prod_desc"
              value={formData.prod_desc}
              onChange={handleInputChange}
              size="lg"
              placeholder="Description"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />
            <Typography variant="h6" color="blue-gray" className="-mb-4">
              Contact no.
            </Typography>
            <Input
              required
              name="phone_no"
              value={formData.phone_no}
              onChange={handleInputChange}
              size="lg"
              placeholder="1234567890"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />

          </div>
          <Button type="submit" className=" mt-4" fullWidth>
            Register
          </Button>
        </form>
      </Card>
      </div>
    );
  }
  
  export default RequestItem;