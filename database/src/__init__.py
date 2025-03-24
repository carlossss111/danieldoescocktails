import os
from sqlalchemy import create_engine, event
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.sql.selectable import Select


DB_ENGINE = "postgresql"
DB_CONNECTOR = "pg8000"
DB_USER = os.environ.get("DB_USER")
DB_PASS = os.environ.get("DB_PASSWORD")
DB_HOST = os.environ.get("DB_HOST")
DB_NAME = os.environ.get("DB_NAME")
DB_PORT = 5432

engine = create_engine(f"{DB_ENGINE}+{DB_CONNECTOR}://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



class Transaction:
    def __init__(self, local_session):
        self.__db_gen = next(local_session())
        self.__to_refresh = set()

        event.listen(self.__db_gen, "after_flush", self._track_instances_to_refresh)
        event.listen(self.__db_gen, "do_orm_execute", self._enforce_with_for_update)


    def _track_instances_to_refresh(self, session, flush_context):
        self.__to_refresh.update(session.new)
        self.__to_refresh.update(session.dirty)


    def _enforce_with_for_update(self, execute_state):
        if execute_state is not None and isinstance(execute_state.statement, Select) and not execute_state.is_column_load:
            execute_state.statement = execute_state.statement.with_for_update()


    def __enter__(self):
        return self.__db_gen


    def __exit__(self, exc_type, exc_value, traceback):
        try:
            if exc_type is None:
                self.__db_gen.commit()
                for instance in self.__to_refresh:
                    self.__db_gen.refresh(instance)
            else:
                self.__db_gen.rollback()
                raise
        finally:
            self.__db_gen.close()
            event.remove(self.__db_gen, "after_flush", self._track_instances_to_refresh)



class ReadOnly:
    def __init__(self, local_session):
        self.__db_gen = next(local_session())


    def __enter__(self):
        return self.__db_gen


    def __exit__(self, exc_type, exc_value, traceback):
        self.__db_gen.close()
        if exc_type is not None:
            raise exc_value

