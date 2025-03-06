# frozen_string_literal: true

module Api
  module V1
    class BooksController < ApiController
      before_action :authenticate_user!, only: %i[create update]
      before_action :set_book, only: %i[show update]

      # GET /api/v1/books
      def index
        @books = Book.includes(:categories).all

        render_success_json ActiveModelSerializers::SerializableResource.new(@books, { each_serializer: BookSerializer })
      end

      # GET /api/v1/books/:id
      def show
        render_success_json ActiveModelSerializers::SerializableResource.new(@book, { each_serializer: BookSerializer })
      end

      # POST /api/v1/books
      def create
        @book = current_user.books.build(book_params)
        assign_categories(@book, params[:category_ids], append: true)

        if @book.save
          render_success_json ActiveModelSerializers::SerializableResource.new(@book, { each_serializer: BookSerializer })
        else
          render json: { status: 422, success: false, errors: @book.errors.full_messages }
        end
      end

      # PUT/PATCH /api/v1/books/:id
      def update
        if @book.update(book_params)
          assign_categories(@book, params[:category_ids])

          render_success_json ActiveModelSerializers::SerializableResource.new(@book, { each_serializer: BookSerializer })
        else
          render json: { status: 422, success: false, errors: @book.errors.full_messages }
        end
      end

      private

      def assign_categories(book, category_ids, append: false)
        return unless category_ids.present?

        categories = Category.where(id: category_ids)
        append ? book.categories << categories : book.categories = categories
      end

      def book_params
        params.require(:book).permit(:title, :description, :book_image,
                                     :author_avatar, :author_name, :pages,
                                     category_ids: [])
      end

      def set_book
        @book = Book.find_by(id: params[:id])

        return render json: { status: 404, success: false, errors: ["Book not found"] }, status: :not_found unless @book
      end
    end
  end
end