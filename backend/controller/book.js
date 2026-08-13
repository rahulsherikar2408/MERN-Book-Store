import Book from "../model/bookModel.js";

export const getBook = async(req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log("Get Books:", error.message);
        res.status(500).json({message: error.message});
    }
}

export const addBook = async(req, res) => {
    try {
        const { title, author, publishYear } = req.body;
        if(!title || !author || !publishYear){
            return res.status(400).json({
                message: "Enter all required fields"
            })
        }
        const book = await Book.create({
            title,
            author,
            publishYear
        });
        return res.status(201).json({
            message: "Book added successfully",
            book: book
        });
        
    } catch (error) {
        console.log("Add Book:", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const getBookDetail = async(req, res) => {
    try {
        const id = req.params.id;
        const { title, author, publishYear } = req.body;
        const book = await Book.findById(id);
        if(!book){
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json({
            message: "Book found",
            book: book
        });
    } catch (error) {
        console.log("Book Detail:", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const updateBook = async(req, res) => {
    try {
        const id = req.params.id;
        const { title, author, publishYear } = req.body;
        if(!title || !author || !publishYear){
            return res.status(400).json({
                message: "Enter all required fields"
            })
        }

        const result = await Book.findByIdAndUpdate(id, {
            title,
            author,
            publishYear
        });

        if(!result){
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({
            message: "Book Updated Succefully",
            book: {
                title,
                author,
                publishYear
            }
        });

    } catch (error) {
        console.log("Update Book:", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const deleteBook = async(req, res) => {
    try {
        const id = req.params.id;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({ message: "Book Deleted Succefully" });

    } catch (error) {
        console.log("Delete Book:", error.message);
        res.status(500).json({ message: error.message });
    }
}