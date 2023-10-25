import {CreateTableCommand, DynamoDBClient} from "@aws-sdk/client-dynamodb"

import {f, logger} from "@/logger"

export interface StoreConfig {
  endpoint?: string
  table: string
}

export async function prepareStore(configuration: StoreConfig): Promise<void> {
  try {
    await new DynamoDBClient(configuration).send(
      new CreateTableCommand({
        AttributeDefinitions: [
          {
            AttributeName: "clientKey",
            AttributeType: "S",
          },
          {
            AttributeName: "key",
            AttributeType: "S",
          },
        ],
        KeySchema: [
          {
            AttributeName: "clientKey",
            KeyType: "HASH",
          },
          {
            AttributeName: "key",
            KeyType: "RANGE",
          },
        ],
        BillingMode: "PAY_PER_REQUEST",
        TableName: configuration.table,
      })
    )

    logger.info(f`Created table: ${configuration.table}`)
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "ResourceInUseException") {
        logger.debug(f`Tables already exists`)
      } else {
        logger.error(f`Unable to create tables`, error)
      }
    }
  }
}
