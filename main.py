from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pokemon-last2.db'
db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app)


class Pokemon(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(50))
    description = db.Column(db.String(255))
    description_sh = db.Column(db.String(255))
    image = db.Column(db.String(255))

    def __repr__(self):
        return '<Pokemon %s>' % self.name


class PokemonSchema(ma.Schema):
    class Meta:
        fields = ("id", "name", "description","description_sh","image")


pokemon_schema = PokemonSchema()
pokemons_schema = PokemonSchema(many=True)


class PokemonListResource(Resource):
    def get(self):
        payload = Pokemon.query.all()
        return pokemons_schema.dump(payload)

    def post(self):
        new_payload = Pokemon(
            name=request.json['name'],
            description=request.json['description'],
            description_sh=request.json['description_sh'],
            image=request.json['image']
        )
        db.session.add(new_payload)
        db.session.commit()
        return pokemon_schema.dump(new_payload)


class PokemonResource(Resource):
    def get(self, pokemon_name):
        payload = Pokemon.query.filter_by(name=pokemon_name.lower()).first()
        return_payload = []
        return_payload.append(pokemon_schema.dump(payload))
        return return_payload



api.add_resource(PokemonListResource, '/pokemon')
api.add_resource(PokemonResource, '/pokemon/<string:pokemon_name>')


if __name__ == '__main__':
    app.run(debug=True)
