import React from 'react';
import './AddBooks.css';
const AddBooks = () => {
    return (
        <div className="addbooks-container">
            <form className="addbooks-form" action="">
                <div className="form-book-input">
                    <div>
                        <h3>Book Name</h3>
                        <input type="text" placeholder="Enter Name" name="book-name" id="book-name" />
                    </div>
                </div>
                <div className="form-book-input">
                    <div>
                        <h3>Author Name</h3>
                        <input type="text" placeholder="Enter Name" name="author-name" id="author-name" />
                    </div>
                </div>
                <div className="form-book-input">
                    <div>
                        <h3>Price</h3>
                        <input type="number" placeholder="Enter Price" name="book-price" id="book-price" />
                    </div>
                </div>
                <div className="form-book-input">
                    <div>
                        <h3>Add Book Cover Photo</h3>
                        <input className="custom-upload" type="file" name="book-cover" id="book-cover" />
                    </div>
                </div>
                <div className="form-book-input submit">
                    <div>
                        <input className="submit-input" type="submit" value="Save" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddBooks;