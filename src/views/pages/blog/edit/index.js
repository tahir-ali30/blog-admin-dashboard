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

const BlogEdit = () => {

  const { id } = useParams();
  let editorState;

  // ** States
  const [data, setData] = useState(null),
    [title, setTitle] = useState(''),
    [tags, setTags] = useState(''),
    [status, setStatus] = useState(''),
    [content, setContent] = useState(editorState),
    [blogCategory, setBlogCategory] = useState([]),
    [featuredImg, setFeaturedImg] = useState(null),
    [imgPath, setImgPath] = useState('banner.jpg'),
    [isLoading, setIsLoading] = useState(true),
    [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    axios.get(`/api/v1/blogs/${id}`)
      .then(res => res.data.data)
      .then(blog => {
        setData(blog.author)
        setTitle(blog.title)
        setTags(blog.tags.join(','))
        setBlogCategory(categories.find(cat => cat.value === blog.category))
        setFeaturedImg(blog.featured_img)
        setStatus(blog.status)
        const initialContent = blog.content

        const contentBlock = htmlToDraft(initialContent)
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
        editorState = EditorState.createWithContent(contentState)
        setContent(editorState)
        setIsLoading(false)
    })
    }, [])

  const categories = [
    { value: 'Design', label: 'Design' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Gadget', label: 'Gadget' },
    { value: 'SEO', label: 'SEO' },
    { value: 'Travel', label: 'Travel' },
    { value: 'Lifestyle', label: 'Lifestyle' },
    { value: 'Leadership', label: 'Leadership' },
    { value: 'Food', label: 'Food' },
  ]

  const onChange = e => {
    const file = e.target.files?.[0]
    setFeaturedImg(file)
  // const reader = new FileReader(),
    //   files = e.target.files
    // setImgPath(files[0].name)
    // reader.onload = function () {
    //   setFeaturedImg(reader.result)
    // }
    // reader.readAsDataURL(files[0])
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const blogContent = draftToHtml(convertToRaw(content.getCurrentContent()))

    setIsSubmitting(true)
    const { message } = (await axios.patch(`/api/v1/blogs/${id}`, { title, content: blogContent, featured_img: featuredImg, status, tags, category: blogCategory.value }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })).data;
    setIsSubmitting(false)
    alert(message);
  }

  async function handleDelete() {
    const {message} = (await axios.delete(`/api/v1/blogs/${id}`)).data
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
                <Form className='mt-2' onSubmit={handleSubmit}>
                  <Row>
                    <Col md='6' className='mb-2'>
                      <Label className='form-label' for='blog-edit-title'>
                        Title
                      </Label>
                      <Input id='blog-edit-title' value={title} onChange={e => setTitle(e.target.value)} />
                    </Col>
                    <Col md='6' className='mb-2'>
                      <Label className='form-label' for='blog-edit-category'>
                        Category
                      </Label>
                      <Select
                        id='blog-edit-category'
                        isClearable={false}
                        theme={selectThemeColors}
                        value={blogCategory}
                        isMulti
                        name='colors'
                        options={categories}
                        className='react-select'
                        classNamePrefix='select'
                        onChange={data => setBlogCategory(data)}
                      />
                    </Col>
                    <Col md='6' className='mb-2'>
                      <Label className='form-label' for='blog-edit-slug'>
                        Tags
                      </Label>
                      <Input id='blog-edit-slug' value={tags} onChange={e => setTags(e.target.value)} />
                    </Col>
                    <Col md='6' className='mb-2'>
                      <Label className='form-label' for='blog-edit-status'>
                        Status
                      </Label>
                      <Input
                        type='select'
                        id='blog-edit-status'
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                      >
                        <option value=''>Select Status</option>
                        <option value='Published'>Published</option>
                        <option value='Pending'>Pending</option>
                        <option value='Draft'>Draft</option>
                      </Input>
                    </Col>
                    <Col sm='12' className='mb-2'>
                      <Label className='form-label'>Content</Label>
                      <Editor editorState={content} onEditorStateChange={data => setContent(data)} />
                    </Col>
                    <Col className='mb-2' sm='12'>
                      <div className='border rounded p-2'>
                        <h4 className='mb-1'>Featured Image</h4>
                        <div className='d-flex flex-column flex-md-row'>
                          {featuredImg && <img
                            className='rounded me-2 mb-1 mb-md-0'
                            src={typeof featuredImg == 'string' ? featuredImg : URL.createObjectURL(featuredImg)}
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
