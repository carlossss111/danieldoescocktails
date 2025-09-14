import logging
from typing import BinaryIO


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

        with open(file_path, "wb") as storage_fp:
            storage_fp.write(image_file.read())

        self.__logger.info("Stored file at %s", file_path)
   
