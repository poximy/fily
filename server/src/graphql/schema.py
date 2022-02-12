import strawberry
from strawberry.fastapi import GraphQLRouter

from .mutation import Mutation
from .query import Query

schema = strawberry.Schema(
  query=Query,
  mutation=Mutation,
  subscription=None,
)

graphql_app = GraphQLRouter(schema=schema)
