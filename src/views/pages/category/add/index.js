// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import axios from 'axios'

// ** Custom Components
import Avatar from '@components/avatar'
import Breadcrumbs from '@components/breadcrumbs'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardText, Form, Label, Input, Button } from 'reactstrap'

// ** Styles
import '@styles/react/libs/editor/editor.scss'
import '@styles/base/plugins/forms/form-quill-editor.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/base/pages/page-blog.scss'
import { asyncHandler } from '../../../../utility/Utils'
import { Controller, useForm } from 'react-hook-form'

const CategoryAdd = () => {
  // ** States
  const [data, setData] = useState(null),
    [featuredImg, setFeaturedImg] = useState(null),
    [imgPath, setImgPath] = useState('')
  
  const { handleSubmit, control, formState: { isSubmitting } } = useForm();

  const onChange = e => {
      const file = e.target.files?.[0]
    setFeaturedImg(file)
    setImgPath(file.name);
  }

  async function onSubmitHandler(data) {
    const { message } = await asyncHandler(axios.postForm)('/api/v1/category', { ...data, category_img: featuredImg });
      alert(message);
    }

  return (
    <div className='blog-edit-wrapper'>
      <Breadcrumbs title='Category Add' data={[{ title: 'Pages' }, { title: 'Category' }, { title: 'Add' }]} />
        <Row>
          <Col sm='12'>
            <Card>
              <CardBody>
                <div className='d-flex'>
                  <div>
                    <Avatar className='me-75' img={data?.avatar} imgWidth='38' imgHeight='38' />
                  </div>
                  <div>
                    <h6 className='mb-25'>{data?.userFullName}</h6>
                    <CardText>{data?.createdTime}</CardText>
                  </div>
                </div>
                <Form className='mt-2' onSubmit={handleSubmit(onSubmitHandler)}>
                  <Row>
                    <Col md='6' className='mb-2'>
                      <Label className='form-label' for='blog-edit-title'>
                        Name
                    </Label>
                    <Controller
                      control={control}
                      name="name"
                      render={({ field }) => (
                        <Input {...field} id='blog-edit-title' />
                      )} />
                    </Col>
                    <Col md='6' className='mb-2'>
                      <Label className='form-label' for='blog-edit-slug'>
                        Meta Title
                    </Label>
                    <Controller
                      control={control}
                      name="meta_title"
                      render={({ field }) => (
                        <Input {...field} id='blog-edit-slug' />                      
                    )} />
                    </Col>
                    <Col md='6' className='mb-2'>
                      <Label className='form-label' for='blog-edit-status'>
                        Meta Description
                      </Label>
                      <Controller
                      control={control}
                      name="meta_description"
                      render={({ field }) => (
                        <Input {...field} id='blog-edit-slug' />                      
                    )} />
                    </Col>
                    <Col sm='12' className='mb-2'>
                      <Label className='form-label'>Description</Label>
                      <Controller
                      control={control}
                      name="description"
                      render={({ field }) => (
                        <Input {...field} id='blog-edit-slug' type='textarea' />
                    )} />
                    </Col>
                    <Col className='mb-2' sm='12'>
                      <div className='border rounded p-2'>
                        <h4 className='mb-1'>Category Image</h4>
                        <div className='d-flex flex-column flex-md-row'>
                          <img
                            className='rounded me-2 mb-1 mb-md-0'
                            src={featuredImg ? URL.createObjectURL(featuredImg) : ''}
                            alt='Category Image'
                            width='170'
                            height='110'
                          />
                          <div>
                            <small className='text-muted'>Required image resolution 800x400, image size 10mb.</small>

                            <p className='my-50'>
                              <a href='/' onClick={e => e.preventDefault()}>
                                {`C:/fakepath/${imgPath}`}
                              </a>
                            </p>
                            <div className='d-inline-block'>
                              <div className='mb-0'>
                                <Input
                                  type='file'
                                  id='exampleCustomFileBrowser'
                                  name='customFile'
                                  onChange={onChange}
                                  accept='.jpg, .png, .gif'
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col className='mt-50'>
                      <Button color='primary' className='me-1' disabled={isSubmitting}>
                        {isSubmitting ? 'Uploading Category' : 'Add Category'}
                      </Button>
                      <Button color='secondary' outline>
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
    </div>
  )
}

export default CategoryAdd
