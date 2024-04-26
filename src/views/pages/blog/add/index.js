// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import axios from 'axios'
import Select from 'react-select'
import htmlToDraft from 'html-to-draftjs'
import draftToHtml from 'draftjs-to-html'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, ContentState, convertToRaw } from 'draft-js'

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
import { useSelector } from 'react-redux'
import { asyncHandler, titleFormat } from '../../../../utility/Utils'
import { Controller, useForm } from 'react-hook-form'

const BlogAdd = () => {
  const editorState = EditorState.createEmpty()

  // ** States
  const [data, setData] = useState(null),
    [featuredImg, setFeaturedImg] = useState(null),
    [imgPath, setImgPath] = useState('banner.jpg'),
    [categories, setCategories] = useState([])
  
  const { control, handleSubmit, formState: { isSubmitting } } = useForm();

  useEffect(() => {
    asyncHandler(axios.get)('/api/v1/category')
      .then(res => {
      const categories = res.data;
      const formatCategories = categories.map(category => ({ value: category._id, label: titleFormat(category.name) }))
      setCategories(formatCategories);
      });
  }, []);

  const onChange = e => {
      const file = e.target.files?.[0]
      setFeaturedImg(file)
  }

  async function onSubmitHandler(data) {
    const blogContent = draftToHtml(convertToRaw(data.content.getCurrentContent()))
    const { message } = await asyncHandler(axios.postForm)('/api/v1/blogs', { ...data, content: blogContent, category: blogCategory.value });
    alert(message)
    }

  return (
    <div className='blog-edit-wrapper'>
      <Breadcrumbs title='Blog Add' data={[{ title: 'Pages' }, { title: 'Blog' }, { title: 'Add' }]} />
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
                        Title
                    </Label>
                    <Controller
                      name="title"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id='blog-edit-title' />                      
                    )} />
                    </Col>
                    <Col md='6' className='mb-2'>
                      <Label className='form-label' for='blog-edit-category'>
                        Category
                      </Label>
                      <Controller
                      name="blogCategory"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          id='blog-edit-category'
                          isClearable={false}
                          theme={selectThemeColors}
                          // isMulti
                          name='colors'
                          options={categories}
                          className='react-select'
                          classNamePrefix='select'
                      />
                    )} />
                    </Col>
                    <Col md='6' className='mb-2'>
                      <Label className='form-label' for='blog-edit-slug'>
                        Tags
                    </Label>
                    <Controller
                      name='tags'
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id='blog-edit-slug' />
                      ) } />
                    </Col>
                    <Col md='6' className='mb-2'>
                      <Label className='form-label' for='blog-edit-status'>
                        Status
                      </Label>
                      <Controller
                      name='status'
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type='select'
                          id='blog-edit-status'
                        >
                          <option value=''>Select Status...</option>
                          <option value='Published'>Published</option>
                          <option value='Pending'>Pending</option>
                          <option value='Draft'>Draft</option>
                      </Input>
                      )} />
                      </Col>
                    <Col sm='12' className='mb-2'>
                    <Label className='form-label'>Content</Label>
                    <Controller
                      name='content'
                      control={control}
                      defaultValue={editorState}
                      render={({ field: { onChange, value } }) => (
                        <Editor editorState={value} onEditorStateChange={onChange} />
                      )}
                    />
                    </Col>
                    <Col className='mb-2' sm='12'>
                      <div className='border rounded p-2'>
                        <h4 className='mb-1'>Featured Image</h4>
                        <div className='d-flex flex-column flex-md-row'>
                          <img
                            className='rounded me-2 mb-1 mb-md-0'
                            src={featuredImg ? URL.createObjectURL(featuredImg) : ''}
                            alt='featured img'
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
                        {isSubmitting ? 'Uploading Blog' : 'Add Blog'}
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

export default BlogAdd
