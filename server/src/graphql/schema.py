import strawberry
from strawberry.fastapi import GraphQLRouter

from . import mutation
from . import query

schema = strawberry.Schema(
    query=query.Query,
    mutation=mutation.Mutation,
    subscription=None,
)

graphql_app = GraphQLRouter(schema=schema)
