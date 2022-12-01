import { faPlus, faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AddCourseForm from "../../common/manage_course_form/AddCourseForm";
import Button from "../../common/Button";
import Modal from "../../common/Modal";
import EditCourseForm from "../../common/manage_course_form/EditCourseForm";

const ManageTeaching = () => {
  const [isOpenAddModal, setOpenAddModal] = useState(false);
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const openAddModal = () => {
    setOpenAddModal(true);
  };

  const closeAddModal = () => {
    setOpenAddModal(false);
  };

  
  const openEditModal = () => {
    setOpenEditModal(true);
  };

  const closeEditModal = () => {
    setOpenEditModal(false);
  };


  return (
    <>
      <div className="max-w-[1320px] ml-auto mr-auto pt-[40px] pb-[40px]">
        <div className="flex justify-between items-center">
          <h1 className="text-[var(--primary-color)] text-[46px] text-center">
            My courses
          </h1>
          <div
            className="w-[50px] h-[50px] rounded-full bg-[var(--primary-color)] flex justify-center items-center inline-block"
            onClick={openAddModal}
          >
            <NavLink>
              <FontAwesomeIcon icon={faPlus} className="text-3xl text-white " />
            </NavLink>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5 mt-[40px]">
          <div href="#" className="">
            <div className="w-[300px] h-[250px] ">
              <img
                className="w-full h-full rounded-lg"
                src="https://ghouse.com.vn/wp-content/uploads/2019/07/ghouse-huongdan-c.jpg"
                alt=""
              />
            </div>
            <div className="mt-[12px]">
              <h2 className="text-2xl font-semibold">Lập trình C/C++</h2>
              <div className="mt-[12px]">
                <div>
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[var(--primary-color)]"
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[var(--primary-color)]"
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[var(--primary-color)]"
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[var(--primary-color)]"
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[var(--primary-color)]"
                  />
                </div>

                <h3 className="mt-[8px]">By Lê Ngọc Thành</h3>
                <p className="mt-[8px] text-3xl text-[var(--primary-color)]">
                  $12.35
                </p>
              </div>
              <div className="flex gap-5 mt-5">
                <Button primary={true} onClick={openEditModal}>Edit</Button>
                <Button deleteBtn={true}>Delete</Button>
              </div>
            </div>
          </div>
          <div className="">
            <div className="w-[300px] h-[250px] ">
              <img
                className="w-full h-full rounded-lg"
                src="https://ghouse.com.vn/wp-content/uploads/2019/07/ghouse-huongdan-c.jpg"
                alt=""
              />
            </div>
            <div className="mt-[12px]">
              <h2 className="text-2xl font-semibold">Lập trình C/C++</h2>
              <div className="mt-[12px]">
                <div>
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[var(--primary-color)]"
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[var(--primary-color)]"
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[var(--primary-color)]"
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[var(--primary-color)]"
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[var(--primary-color)]"
                  />
                </div>

                <h3 className="mt-[8px]">By Lê Ngọc Thành</h3>
                <p className="mt-[8px] text-3xl text-[var(--primary-color)]">
                  $12.35
                </p>
              </div>
              <div className="flex gap-5 mt-5">
                <Button primary={true}>Edit</Button>
                <Button deleteBtn={true}>Delete</Button>
              </div>
            </div>
          </div>
          <div className="">
            <div className="w-[300px] h-[250px] ">
              <img
                className="w-full h-full rounded-lg"
                src="https://ghouse.com.vn/wp-content/uploads/2019/07/ghouse-huongdan-c.jpg"
                alt=""
              />
            </div>
            <div className="mt-[12px]">
              <h2 className="text-2xl font-semibold">Lập trình C/C++</h2>
              <div className="mt-[12px]">
                <div>
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[var(--primary-color)]"
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[var(--primary-color)]"
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[var(--primary-color)]"
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[var(--primary-color)]"
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[var(--primary-color)]"
                  />
                </div>

                <h3 className="mt-[8px]">By Lê Ngọc Thành</h3>
                <p className="mt-[8px] text-3xl text-[var(--primary-color)]">
                  $12.35
                </p>
              </div>
              <div className="flex gap-5 mt-5">
                <Button primary={true}>Edit</Button>
                <Button deleteBtn={true}>Delete</Button>
              </div>
            </div>
          </div>
          <div className="">
            <div className="w-[300px] h-[250px] ">
              <img
                className="w-full h-full rounded-lg"
                src="https://ghouse.com.vn/wp-content/uploads/2019/07/ghouse-huongdan-c.jpg"
                alt=""
              />
            </div>
            <div className="mt-[12px]">
              <h2 className="text-2xl font-semibold">Lập trình C/C++</h2>
              <div className="mt-[12px]">
                <div>
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[var(--primary-color)]"
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[var(--primary-color)]"
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[var(--primary-color)]"
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[var(--primary-color)]"
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[var(--primary-color)]"
                  />
                </div>

                <h3 className="mt-[8px]">By Lê Ngọc Thành</h3>
                <p className="mt-[8px] text-3xl text-[var(--primary-color)]">
                  $12.35
                </p>
              </div>
              <div className="flex gap-5 mt-5">
                <Button primary={true}>Edit</Button>
                <Button deleteBtn={true}>Delete</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpenAddModal &&  <Modal
        isOpen={isOpenAddModal}
        onRequestClose={closeAddModal}
        shouldCloseOnOverlayClick={true}
      > 
        <AddCourseForm closeModal={closeAddModal}/>
      </Modal>}
      
      {isOpenEditModal && <Modal
        isOpen={isOpenEditModal}
        onRequestClose={closeEditModal}
        shouldCloseOnOverlayClick={true}
      > 
        <EditCourseForm closeModal={closeEditModal}/>
      </Modal>}
    </>
  );
};

export default ManageTeaching;
