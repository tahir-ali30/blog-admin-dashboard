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

const BlogAdd = () => {
  const initialContent = ``

  // const contentBlock = htmlToDraft(initialContent)
  // const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
  const editorState = EditorState.createEmpty()

  // ** States
  const [data, setData] = useState(null),
    [title, setTitle] = useState(''),
    [tags, setTags] = useState(''),
    [status, setStatus] = useState(''),
    [content, setContent] = useState(editorState),
    [blogCategory, setBlogCategory] = useState([]),
    [featuredImg, setFeaturedImg] = useState(null),
    [imgPath, setImgPath] = useState('banner.jpg'),
    [isSubmitting, setIsSubmitting] = useState(false)

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
      //   console.log(file);
    // const reader = new FileReader(),
    // setImgPath(files[0].name)
    // reader.onload = function () {
    // }
    // reader.readAsDataURL(files[0])
  }

    async function handleSubmit(e){
      e.preventDefault()
      const blogContent = draftToHtml(convertToRaw(content.getCurrentContent()))

      setIsSubmitting(true)
      const { message } = (await axios.post('/api/v1/blogs', { title, content: blogContent, featured_img: featuredImg, status, tags, category: blogCategory.value }, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjIxMDYzMTFkMTU0ZThhNDAyMmY4NTMiLCJuYW1lIjoiVGFoaXIgQWxpIiwiaWF0IjoxNzEzNDQwMzM3LCJleHAiOjE3MTM1MjY3Mzd9.s_aBRK0861qnvt3uwdyxSKchWJREC6oQsh_5FnI4xDE'
        }
      })).data;
      setIsSubmitting(false)
      alert(message);
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
                        <option value=''>Select Status...</option>
                        <option value='Published'>Published</option>
                        <option value='Pending'>Pending</option>
                        <option value='Draft'>Draft</option>
                      </Input>
                    </Col>
                    <Col sm='12' className='mb-2'>
                      <Label className='form-label'>Content</Label>
                                      <Editor editorState={content} onEditorStateChange={data => {setContent(data)}} />
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
