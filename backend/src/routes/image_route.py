import logging
import os

from fastapi import APIRouter, HTTPException, UploadFile

from services.image_service import ImageService


IMAGE_MIME_TYPE = "image/jpeg"


class ImageRouter:
    __logger = logging.getLogger(__module__)

    def __new__(cls): # Singleton
        if not hasattr(cls, 'instance'):
            cls.instance = super(ImageRouter, cls).__new__(cls)
        return cls.instance


    def __init__(self):
        self._router = APIRouter()
        self._router.add_api_route("/images", self.route_get_image, methods=["GET"])
        self._router.add_api_route("/protected/images", self.route_put_image, methods=["PUT"])

        image_dir = os.environ.get("IMAGE_DIRECTORY", "/opt/images")
        self._image_service = ImageService(image_dir)

        multipart_logger = logging.getLogger("python_multipart")
        multipart_logger.setLevel(logging.INFO) # disables spammy debug logs


    @property
    def router(self):
        return self._router


    def route_get_image(self, file_name: str):
        raise HTTPException(501, "Not implemented")
           

    def route_put_image(self, file: UploadFile):
        self.__logger.info("Adding a new image file: %s", file.filename)

        if file.content_type != IMAGE_MIME_TYPE:
            self.__logger.error("Tried to upload an image of the wrong filetype: %s", file.content_type)
            raise HTTPException(415, "Expecting MIME type image/jpeg")
        if file.filename is None:
            self.__logger.error("Tried to upload an image with no filename")
            raise HTTPException(418, "File has no filename (how'd you manage that?)")

        try:
            self._image_service.store_in_filesystem(file.filename, file.file)
        except Exception as e:
            self.__logger.error("Failed to write image file: %s", e)
            raise HTTPException(500, "Failed to write image file.")

        return 201

