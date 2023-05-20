import React, { useState, useRef } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Label,
  FormFeedback,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  addBook,
  removeAll,
  removeBook,
  editBookDetails,
} from "./store/Bookdata/actions";
import { useSelector, useDispatch } from "react-redux";

const Table = () => {
  const dispatch = useDispatch();

  const { data, isbn } = useSelector((state) => ({
    data: state.bookshelf.data,
    isbn: state.bookshelf.isbn,
  }));

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [editData, setEditData] = useState({});
  const [action, setAction] = useState();
  const [isbnOld, setIsbnOld] = useState();

  const { SearchBar } = Search;
  var node = useRef();

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: editData?.title || "",
      author: editData?.author || "",
      year: editData?.year || "",
      isbn: editData?.isbn || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Your Name"),
      author: Yup.string().required("Please Enter Your Phone"),
      year: Yup.string().required("Please Enter Your Email"),
      isbn: Yup.string().required("Please Enter Your Address"),
    }),
    onSubmit: (values) => {
      if (action.toString() === "Add") {
        if (!isbn.includes(values.isbn)) {
          dispatch(
            addBook(values.title, values.author, values.year, values.isbn)
          );
        } else {
          alert("enter unique book");
        }
      } else {
        dispatch(
          editBookDetails(
            values.title,
            values.author,
            values.year,
            values.isbn,
            isbnOld
          )
        );
      }
    },
  });

  const columns = [
    {
      dataField: "title",
      text: "Title",
    },
    {
      dataField: "author",
      text: "Author",
      sort: true,
    },
    {
      dataField: "year",
      text: "Year Published",
      sort: true,
    },
    {
      dataField: "isbn",
      text: "ISBN",
    },
    {
      dataField: "action",
      text: "Action",
      formatter: (cell, row) => (
        <>
          <Button
            color="info"
            className="me-2"
            onClick={() => {
              setAction("Edit");
              toggle();
              setEditData(row);
              setIsbnOld(row?.isbn);
            }}
          >
            Edit
          </Button>
          <Button
            color="danger"
            onClick={() => dispatch(removeBook(row?.isbn))}
          >
            Remove
          </Button>
        </>
      ),
    },
  ];

  const pageOptions = {
    sizePerPage: 10,
    totalSize: data?.length,
    custom: true,
  };

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{action} Book</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <div className="mb-3">
              <Label>Title</Label>
              <Input
                name="title"
                placeholder="title"
                className="mb-2"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.title || ""}
                invalid={
                  validation.touched.title && validation.errors.title
                    ? true
                    : false
                }
              />
              {validation.touched.title && validation.errors.title ? (
                <FormFeedback type="invalid">
                  {validation.errors.title}
                </FormFeedback>
              ) : null}

              <Label>Author</Label>
              <Input
                name="author"
                placeholder="author"
                className="mb-2"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.author || ""}
                invalid={
                  validation.touched.author && validation.errors.author
                    ? true
                    : false
                }
              />
              {validation.touched.author && validation.errors.author ? (
                <FormFeedback type="invalid">
                  {validation.errors.author}
                </FormFeedback>
              ) : null}

              <Label>Year Published</Label>
              <Input
                name="year"
                type="number"
                placeholder="Year Published"
                className="mb-2"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.year || ""}
                invalid={
                  validation.touched.year && validation.errors.year
                    ? true
                    : false
                }
              />
              {validation.touched.year && validation.errors.year ? (
                <FormFeedback type="invalid">
                  {validation.errors.year}
                </FormFeedback>
              ) : null}

              <Label>ISBN</Label>
              <Input
                name="isbn"
                placeholder="isbn"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.isbn || ""}
                invalid={
                  validation.touched.isbn && validation.errors.isbn
                    ? true
                    : false
                }
              />
              {validation.touched.isbn && validation.errors.isbn ? (
                <FormFeedback type="invalid">
                  {validation.errors.isbn}
                </FormFeedback>
              ) : null}
            </div>
            <div className="d-flex flex-wrap gap-2">
              <Button type="submit" color="primary" onClick={toggle}>
                Add
              </Button>
              <Button type="reset" color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <PaginationProvider
                pagination={paginationFactory(pageOptions)}
                keyField="isbn"
                columns={columns}
                data={data}
              >
                {({ paginationProps, paginationTableProps }) => (
                  <ToolkitProvider
                    keyField="isbn"
                    data={data}
                    columns={columns}
                    bootstrap4
                    search
                  >
                    {(toolkitProps) => (
                      <React.Fragment>
                        <Row
                          className="mb-2"
                          style={{ justifyContent: "space-between" }}
                        >
                          <Col sm="4">
                            <div className="search-box me-2 mb-2 d-inline-block">
                              <div className="position-relative">
                                <SearchBar {...toolkitProps.searchProps} />
                                <i className="bx bx-search-alt search-icon" />
                              </div>
                            </div>
                          </Col>
                          <Col sm="4" style={{ textAlign: "end" }}>
                            <Button
                              type="button"
                              color="primary"
                              className="btn-rounded me-2"
                              onClick={() => {
                                toggle();
                                setAction("Add");
                                setEditData({});
                              }}
                            >
                              Add Books
                            </Button>
                            <Button
                              type="button"
                              color="danger"
                              className="btn-rounded"
                              onClick={() => {
                                dispatch(removeAll());
                              }}
                            >
                              Delete All Books
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col xl="12">
                            <div className="table-responsive">
                              <BootstrapTable
                                keyField="isbn"
                                data={data}
                                columns={columns}
                                headerClasses="table-light"
                                classes={
                                  "table align-middle table-nowrap table-check "
                                }
                                headerWrapperClasses={"table-light"}
                                {...toolkitProps.baseProps}
                                {...paginationTableProps}
                                ref={node}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row className="align-items-md-center mt-30">
                          <Col className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination">
                            <PaginationListStandalone {...paginationProps} />
                          </Col>
                        </Row>
                      </React.Fragment>
                    )}
                  </ToolkitProvider>
                )}
              </PaginationProvider>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Table;
