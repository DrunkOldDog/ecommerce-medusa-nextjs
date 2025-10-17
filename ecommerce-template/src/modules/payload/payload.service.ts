import { MedusaError } from "@medusajs/framework/utils";
import qs from "qs";
import { PayloadCollectionManager } from "./PayloadCollectionManager.class";

import type {
  PayloadModuleOptions,
  PayloadCollectionItem,
  PayloadUpsertData,
  PayloadQueryOptions,
  PayloadItemResult,
  PayloadApiResponse,
  PayloadBulkResult,
} from "./payload.types";
import type { PayloadCollectionFilter } from "./PayloadCollectionManager.class";


type InjectedDependencies = {
  // inject any dependencies you need here
};

export default class PayloadModuleService {
  private baseUrl: string;
  private headers: Record<string, string>;
  private defaultOptions: Record<string, any> = {
    is_from_medusa: true,
  };

  constructor(container: InjectedDependencies, options: PayloadModuleOptions) {
    this.validateOptions(options);
    this.baseUrl = `${options.serverUrl}/api`;

    this.headers = {
      "Content-Type": "application/json",
      Authorization: `${options.userCollection || "users"} API-Key ${
        options.apiKey
      }`,
    };
  }

  validateOptions(options: Record<any, any>): void | never {
    if (!options.serverUrl) {
      throw new MedusaError(
        MedusaError.Types.INVALID_ARGUMENT,
        "Payload server URL is required"
      );
    }

    if (!options.apiKey) {
      throw new MedusaError(
        MedusaError.Types.INVALID_ARGUMENT,
        "Payload API key is required"
      );
    }
  }

  private async makeRequest<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.headers,
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new MedusaError(
          MedusaError.Types.UNEXPECTED_STATE,
          `Payload API error: ${response.status} ${response.statusText}. ${
            errorData.message || ""
          }`
        );
      }

      return await response.json();
    } catch (error) {
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `Failed to communicate with Payload: ${JSON.stringify(error)}`
      );
    }
  }

  async create<T extends PayloadCollectionItem = PayloadCollectionItem>(
    collection: string,
    data: PayloadUpsertData,
    options: PayloadQueryOptions = {}
  ): Promise<PayloadItemResult<T>> {
    const stringifiedQuery = qs.stringify(
      {
        ...options,
        ...this.defaultOptions,
      },
      {
        addQueryPrefix: true,
      }
    );

    const endpoint = `/${collection}/${stringifiedQuery}`;

    const result = await this.makeRequest<PayloadItemResult<T>>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return result;
  }

  async update<T extends PayloadCollectionItem = PayloadCollectionItem>(
    collection: string,
    data: PayloadUpsertData,
    options: PayloadQueryOptions = {}
  ): Promise<PayloadItemResult<T>> {
    const stringifiedQuery = qs.stringify(
      {
        ...options,
        ...this.defaultOptions,
      },
      {
        addQueryPrefix: true,
      }
    );

    const endpoint = `/${collection}/${stringifiedQuery}`;

    const result = await this.makeRequest<PayloadItemResult<T>>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    return result;
  }

  async delete(
    collection: string,
    options: PayloadQueryOptions = {}
  ): Promise<PayloadApiResponse> {
    const stringifiedQuery = qs.stringify(
      {
        ...options,
        ...this.defaultOptions,
      },
      {
        addQueryPrefix: true,
      }
    );

    const endpoint = `/${collection}/${stringifiedQuery}`;

    const result = await this.makeRequest<PayloadApiResponse>(endpoint, {
      method: "DELETE",
    });

    return result;
  }

  async find(
    collection: string,
    options: PayloadQueryOptions = {}
  ): Promise<PayloadBulkResult<PayloadCollectionItem>> {
    const stringifiedQuery = qs.stringify(
      {
        ...options,
        ...this.defaultOptions,
      },
      {
        addQueryPrefix: true,
      }
    );

    const endpoint = `/${collection}${stringifiedQuery}`;

    const result = await this.makeRequest<
      PayloadBulkResult<PayloadCollectionItem>
    >(endpoint);

    return result;
  }

  async list(filter: PayloadCollectionFilter) {
    const collectionManager = new PayloadCollectionManager(filter);

    const ids = collectionManager.getCollectionIds();
    const filterKey = collectionManager.getFilterKey();
    const collection = collectionManager.getCollectionName();

    const result = await this.find(collection, {
      where: {
        medusa_id: {
          in: ids.join(","),
        },
      },
      depth: 2,
    });

    return result.docs.map((doc) => ({
      ...doc,
      [filterKey]: doc.medusa_id,
    }));
  }
}
