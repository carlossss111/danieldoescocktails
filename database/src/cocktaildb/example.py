from cocktaildb import Transaction, get_db
from cocktaildb.methods import cocktail


if __name__ == '__main__':
    with Transaction(get_db) as db:
        mycocktail = cocktail.fetch_one(db, 1)
        if mycocktail:
            print(mycocktail.name)

