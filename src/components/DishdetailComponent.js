import React, { Component } from 'react';
import {Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem,Button,
         Modal,ModalBody,ModalHeader,Label,Row} from 'reactstrap';
import {Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

    const DishDetail = (props) => {
       if (props.dish != null) {
           return (
               <div className="container">
                   <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                   <div className="row">
                            <RenderDish dish={props.dish}/>
                            <RenderComments comments={props.comments} />
                   </div>
               </div> 
           )
       } else {
           return (
               <div>

               </div>
           )
       }
    }

    function RenderDish({dish}) {
        return (
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" object src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
        );
    };

    function RenderComments({comments}) {

        const listComments = comments.map((comment) => {
            return(
                <div key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>--{comment.author} , {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day:'2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                </div>
            )
        });

        if ( comments != null) {
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {listComments}
                        <CommentForm/>
                    </ul>
                </div>
                
            )
        } else {
            return(
                <div>

                </div>
            )
        }
        
    };

    class CommentForm extends Component {
        constructor(props) {
            super(props);

            this.state = {
                isModalOpen: false
            }
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        handleSubmit(values) {
            console.log("Current State is: " + JSON.stringify(values));
            alert("Current State is: " + JSON.stringify(values));
        }

        toggleModal() {
            this.setState({
                isModalOpen : !this.state.isModalOpen
            })
        }

        render() {
            return (
                <React.Fragment>
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-sm">  {' '}
                        Submit Comment
                        </span>
                    </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group m-1">
                                    <Label htmlFor="rating" >Rating</Label>
                                    <Control.select model=".rating" name="rating"
                                    className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Row>
                                <Row className="form-group m-1 mt-3">
                                    <Label htmlFor="yourname">Your Name</Label>
                                    <Control.text model=".yourname" id="yourname" name="yourname" placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                    />
                                    <Errors className="text-danger"
                                            model=".yourname"
                                            show="touched"
                                            messages={{
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                    />
                                </Row>
                                <Row className="form-group m-1 mt-3">
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="6"  
                                    className="form-control" />
                                </Row>
                                <Row className="form-group m-1 mt-3">
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                            </Row>
                            </LocalForm>
                        </ModalBody>
                </Modal>
                </React.Fragment>
            );
        }
    }



export default DishDetail;