import React, {useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Badge from "@mui/material/Badge";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Table from "react-bootstrap/Table";
import { NavLink } from "react-router-dom";
import Menu from "@mui/material/Menu";
import { useDispatch, useSelector } from "react-redux";
 import {DLT} from '../redux/actions/action'

const Header = () => {

  const [price, setPrice] = useState(0);
  // console.log(price);
  
  // useSelector is used for to get reducer value
  const getdata = useSelector((state) => state.cartreducer.carts);
  // console.log(getdata);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dlt = (id)=>{
    dispatch(DLT(id))
  }

  const total = ()=>{
      let price = 0;
      getdata.map((ele, k)=>{
         price = ele.price* ele.qnty + price 
      });
      setPrice(price);
  };

  useEffect(() => {
    total();
  }, [total])
  

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="p-4">
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-5" style={{fontSize:"1.3em"}}>
            Add to cart
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/cart" className="text-decoration-none text-light" style={{fontSize:"1.2em"}}>
              Home
            </NavLink>
          </Nav>

          {/* taking this badge in material */}
          <Badge badgeContent={getdata.length} color="primary">
            <i
              class="fa-solid fa-cart-shopping text-light"
              style={{ fontSize: "25px", cursor: "pointer" }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            ></i>
          </Badge>
        </Container>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {getdata.length ? (
            <div
              className="card_details"
              style={{ width: "24 rem", padding: 10 }}
            >
              <Table>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Restaurant Name</th>
                  </tr>
                </thead>
                <tbody>
                   {
                      getdata.map((e)=>{
                         return (
                            <>
                               <tr>
                                 <td>
                                  <NavLink to={`/cart/${e.id}`}  onClick={handleClose}
                                  >
                                  <img src={e.imgdata} alt="" style={{width:"5 rem", height:"5rem"}}/>
                                  </NavLink>
                                 
                                 </td>
                                 <td>
                                  <p>{e.rname}</p>
                                  <p>Price:₹{e.price}</p>
                                  <p>Quantity:{e.qnty}</p>
                                  <p style={{color:"red", fontSize:"20", cursor:"pointer"}} 
                                  onClick={()=>dlt(e.id)}
                                  >
                                    <i className="fas fa-trash smalltrash"></i>
                                  </p>
                                 </td>
                                 <td className="mt-5" onClick={()=>dlt(e.id)} style={{color:"red", fontSize:"20", cursor:"pointer"}}>
                                 <i className="fas fa-trash largetrash"></i>
                                 </td>
                               </tr>
                            </>
                         )
                      })
                   }
                   <p className="text-center">Total: ₹ {price}</p>
                </tbody>
              </Table>
            </div>
          ) : (
            <div
              className="card-details d-flex justify-content-center align-items-center"
              style={{ width: "18rem", padding: 6, position: "relative" }}
            >
              <i
                className="fas fa-close smallclose"
                style={{
                  position: "absolute",
                  top: 2,
                  right: 20,
                  fontSize: 18,
                  cursor: "pointer",
                }}
                onClick={handleClose}
              ></i>
              <p style={{ fontSize: 18 }}>Your Cart is Empty</p>
              <img
                src="cart.gif"
                className="emptycard_img"
                style={{ width: "5rem", padding: 10 }}
                alt=""
              />
            </div>
          )}
        </Menu>
      </Navbar>
    </>
  );
};

export default Header;
