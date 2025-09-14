import io
import logging
from typing import BinaryIO
from PIL import Image


IMAGE_SIZE_PX = 600


class ImageService:
    __logger = logging.getLogger(__module__)


    def __new__(cls, mount_path: str):
        # Singleton
        if not hasattr(cls, 'instance'):
            cls.instance = super(ImageService, cls).__new__(cls)
            cls.mount_path = mount_path
        return cls.instance


    def __init__(self, mount_path: str) -> None:
        self.mount_path = mount_path 

    
    def store_in_filesystem(self, file_name: str, image_file: BinaryIO):
        file_path = self.mount_path + "/" + file_name

        with Image.open(io.BytesIO(image_file.read())) as image:
            image = image.resize((IMAGE_SIZE_PX, IMAGE_SIZE_PX), Image.Resampling.NEAREST)
            image.save(file_path)

        self.__logger.info("Stored file at %s", file_path)
   
