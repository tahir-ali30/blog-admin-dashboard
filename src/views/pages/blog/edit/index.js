// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import axios from 'axios'
import Select from 'react-select'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
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
import { useParams } from 'react-router-dom'
import ComponentSpinner from '../../../../@core/components/spinner/Loading-spinner'
import SpinnerComponent from '../../../../@core/components/spinner/Fallback-spinner'
import { asyncHandler, titleFormat } from '../../../../utility/Utils'
import { Controller, useForm } from 'react-hook-form'

const BlogEdit = () => {

  const { id } = useParams();
  let editorState;

  // ** States
  const [data, setData] = useState(null),
    // [title, setTitle] = useState(''),
    // [tags, setTags] = useState(''),
    // [status, setStatus] = useState(''),
    // [content, setContent] = useState(editorState),
    // [blogCategory, setBlogCategory] = useState([]),
    [featured_img, setFeaturedImg] = useState(null),
    [imgPath, setImgPath] = useState('banner.jpg'),
    [isLoading, setIsLoading] = useState(true),
    // [isSubmitting, setIsSubmitting] = useState(false),
    [categories, setCategories] = useState([]);

  const { control, handleSubmit, formState: { isSubmitting }, reset } = useForm();

    useEffect(() => {
    asyncHandler(axios.get)('/api/v1/category').then(({ data }) =>
      setCategories(prev => data.map(({ _id, name }) => ({ value: _id, label: titleFormat(name) }))));

    asyncHandler(axios.get)(`/api/v1/blogs/${id}`)
      .then(res => res.data)
      .then(blog => {
        blog.tags = blog.tags.join(',');
        blog.blogCategory = { value: blog.category._id, label: titleFormat(blog.category.name) };
        setData(blog.author)
        setFeaturedImg(blog.featured_img)

        const contentBlock = htmlToDraft(blog.content)
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
        editorState = EditorState.createWithContent(contentState)
        blog.content = editorState
        reset(blog);
        setIsLoading(false)
      })
    
    }, [])

  const onChange = e => {
    const file = e.target.files?.[0]
    setFeaturedImg(file)
    setImgPath(file.name)
  }

  async function onSubmitHandler(data) {
    const content = draftToHtml(convertToRaw(data.content.getCurrentContent()))
    const { message } = await asyncHandler(axios.patchForm)(`/api/v1/blogs/${id}`, { ...data, content, featured_img, category: data.blogCategory.value });
    alert(message);
  }

  async function handleDelete() {
    const { message } = await asyncHandler(axios.delete)(`/api/v1/blogs/${id}`);
    alert(message);
  }

  return (
    <div className='blog-edit-wrapper'>
      <Breadcrumbs title='Blog Edit' data={[{ title: 'Pages' }, { title: 'Blog' }, { title: 'Edit' }]} />
      {isLoading !== true ? (
        <Row>
          <Col sm='12'>
            <Card>
              <CardBody>
                <div className='d-flex'>
                  <div>
                    <Avatar className='me-75' img={data?.avatar_img} imgWidth='38' imgHeight='38' />
                  </div>
                  <div>
                    <h6 className='mb-25'>{data?.fullName}</h6>
                    <CardText>{data?.createdAt}</CardText>
                  </div>
                </div>
                <Form className='mt-2' onSubmit={handleSubmit(onSubmitHandler)}>
                  <Row>
                    <Col md='6' className='mb-2'>
                      <Label className='form-label' for='blog-edit-title'>
                        Title
                      </Label>
                      <Controller
                        name='title'
                        control={control}
                        render={({ field }) => (
                          <Input {...field} id='blog-edit-title'/>
                        )}
                      />
                    </Col>
                    <Col md='6' className='mb-2'>
                      <Label className='form-label' for='blog-edit-category'>
                        Category
                      </Label>
                      <Controller
                        name='blogCategory'
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
                        )}
                      />
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
                        )}
                      />
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
                          <option value=''>Select Status</option>
                          <option value='Published'>Published</option>
                          <option value='Pending'>Pending</option>
                          <option value='Draft'>Draft</option>
                        </Input>                        )} />

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
                          {featured_img && <img
                            className='rounded me-2 mb-1 mb-md-0'
                            src={typeof featured_img == 'string' ? featured_img : URL.createObjectURL(featured_img)}
                            alt='featured img'
                            width='170'
                            height='110'
                          />}
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
                        {isSubmitting ? 'Uploading Changes' : 'Save Changes'}
                      </Button>
                      <Button color='secondary' outline className='me-1'>
                        Cancel
                      </Button>
                      <Button color='secondary' outline onClick={handleDelete}>
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
       ) : <ComponentSpinner /> }
    </div>
  )
}

export default BlogEdit
