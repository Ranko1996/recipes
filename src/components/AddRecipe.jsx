import React,{ Fragment, useState } from 'react'

const AddRecipe = ({item}) => {
    const[description, setDescription] = useState("")
    const[image, setImage] = useState("")
    const[title, setTitle] = useState("")

    const add = async(e) => {
        try {
            const body = { title, image, description }
            const response = await fetch(`http://localhost:3333/post/`, 
            {
                method:"POST",
                headers: { Authorization: 'Bearer ' + localStorage.access_token, "Content-Type": "application/json"}, 
                body: JSON.stringify(body)
            })
            window.location("/user")
            console.log(response)
        } catch (error) {
            console.log(error.message)
        }
    }
  return (
      <Fragment>

            <form style={{marginBottom:"2rem"}} onSubmit={add}>
                <div className="form-group">
                    <label for="exampleInputEmail1">Title</label>
                    <input type="text" className='form-control' placeholder="Add title" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Description</label>
                    <input type="text" className='form-control' placeholder="Add description" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Image</label>
                    <input type="text" className='form-control' placeholder="Add image" value={image} onChange={e => setImage(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

      </Fragment>
  )
}

export default AddRecipe