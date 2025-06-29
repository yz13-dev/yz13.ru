/* eslint-disable */

import * as sdk from "hypertune";

export const queryId = "9f584f68-72e7-5142-9bcf-e5e55b838a23";

export const query: sdk.Query<sdk.ObjectValueWithVariables> = {"variableDefinitions":{},"fragmentDefinitions":{"CallToAction":{"type":"InlineFragment","objectTypeName":"CallToAction","selection":{"label":{"fieldArguments":{},"fieldQuery":null},"href":{"fieldArguments":{},"fieldQuery":null},"disabled":{"fieldArguments":{},"fieldQuery":null},"visible":{"fieldArguments":{},"fieldQuery":null},"variant":{"fieldArguments":{},"fieldQuery":null},"icon":{"fieldArguments":{},"fieldQuery":null}}}},"fieldQuery":{"Query":{"type":"InlineFragment","objectTypeName":"Query","selection":{"root":{"fieldArguments":{"__isPartialObject__":true},"fieldQuery":{"Root":{"type":"InlineFragment","objectTypeName":"Root","selection":{"callToAction":{"fieldArguments":{},"fieldQuery":{"CallToAction":{"type":"FragmentSpread","fragmentName":"CallToAction"}}},"primaryEmail":{"fieldArguments":{},"fieldQuery":null},"secondaryEmail":{"fieldArguments":{},"fieldQuery":null},"showSearch":{"fieldArguments":{},"fieldQuery":null},"showRequestSite":{"fieldArguments":{},"fieldQuery":null},"showEmailSubscribe":{"fieldArguments":{},"fieldQuery":null},"showLinkToCalendar":{"fieldArguments":{},"fieldQuery":null},"showEventForm":{"fieldArguments":{},"fieldQuery":null},"availableForWork":{"fieldArguments":{},"fieldQuery":null}}}}}}}}};

export const vercelFlagDefinitions = {"primaryEmail":{"options":[],"origin":"https://app.hypertune.com/projects/4870/main/draft/logic?selected_field_path=root%3EprimaryEmail"},"secondaryEmail":{"options":[],"origin":"https://app.hypertune.com/projects/4870/main/draft/logic?selected_field_path=root%3EsecondaryEmail"},"showSearch":{"options":[{"label":"Off","value":false},{"label":"On","value":true}],"origin":"https://app.hypertune.com/projects/4870/main/draft/logic?selected_field_path=root%3EshowSearch"},"showRequestSite":{"options":[{"label":"Off","value":false},{"label":"On","value":true}],"origin":"https://app.hypertune.com/projects/4870/main/draft/logic?selected_field_path=root%3EshowRequestSite"},"showEmailSubscribe":{"options":[{"label":"Off","value":false},{"label":"On","value":true}],"origin":"https://app.hypertune.com/projects/4870/main/draft/logic?selected_field_path=root%3EshowEmailSubscribe"},"showLinkToCalendar":{"options":[{"label":"Off","value":false},{"label":"On","value":true}],"origin":"https://app.hypertune.com/projects/4870/main/draft/logic?selected_field_path=root%3EshowLinkToCalendar"},"showEventForm":{"options":[{"label":"Off","value":false},{"label":"On","value":true}],"origin":"https://app.hypertune.com/projects/4870/main/draft/logic?selected_field_path=root%3EshowEventForm"},"availableForWork":{"options":[{"label":"Off","value":false},{"label":"On","value":true}],"origin":"https://app.hypertune.com/projects/4870/main/draft/logic?selected_field_path=root%3EavailableForWork"}};

export type RootFlagValues = {
  "primaryEmail": string;
  "secondaryEmail": string;
  "showSearch": boolean;
  "showRequestSite": boolean;
  "showEmailSubscribe": boolean;
  "showLinkToCalendar": boolean;
  "showEventForm": boolean;
  "availableForWork": boolean;
}

export type FlagValues = {
  "primaryEmail": string;
  "secondaryEmail": string;
  "showSearch": boolean;
  "showRequestSite": boolean;
  "showEmailSubscribe": boolean;
  "showLinkToCalendar": boolean;
  "showEventForm": boolean;
  "availableForWork": boolean;
}

export type FlagPaths = keyof FlagValues & string;

export const flagFallbacks: FlagValues = {
  "primaryEmail": "",
  "secondaryEmail": "",
  "showSearch": false,
  "showRequestSite": false,
  "showEmailSubscribe": false,
  "showLinkToCalendar": false,
  "showEventForm": false,
  "availableForWork": false,
}

export function decodeFlagValues<TFlagPaths extends keyof FlagValues & string>(
  encodedValues: string,
  flagPaths: TFlagPaths[]
): Pick<FlagValues, TFlagPaths> {
  return sdk.decodeFlagValues({ flagPaths, encodedValues })
}

export type VariableValues = {};

export const EnvironmentEnumValues = [
  "development",
  "production",
  "test"
] as const;
export type Environment = typeof EnvironmentEnumValues[number];

/**
 * This `Context` input type is used for the `context` argument on your root field.
 * It contains details of the current `user` and `environment`.
 * 
 * You can define other custom input types with fields that are primitives, enums 
 * or other input types.
 */
export type Context = {
  environment: Environment;
}

export type RootArgs = {
  context: Context;
}

export type EmptyObject = {};

export type CallToAction = {
  label: string;
  href: string;
  disabled: boolean;
  visible: boolean;
  variant: string;
  icon: string;
}

const callToActionFallback = {label:"",href:"",disabled:false,visible:false,variant:"",icon:""};

export class CallToActionNode extends sdk.Node {
  override typeName = "CallToAction" as const;

  get({ fallback = callToActionFallback as CallToAction}: { fallback?: CallToAction } = {}): CallToAction {
    const getQuery = null;
    return this.getValue({ query: getQuery, fallback }) as CallToAction;
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/4870/main/draft/schema?selected_schema_type=%7B%22type%22%3A%22object%22%2C%22name%22%3A%22CallToAction%22%2C%22selectedChildName%22%3A%22label%22%7D})
   */
  label({ args = {}, fallback }: { args?: EmptyObject; fallback: string; }): string {
    const props0 = this.getFieldNodeProps("label", { fieldArguments: args });
    const expression0 = props0.expression;

    if (
      expression0 &&
      expression0.type === "StringExpression"
    ) {
      const node = new sdk.StringNode(props0);
      return node.get({ fallback });
    }

    const node = new sdk.StringNode(props0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/4870/main/draft/schema?selected_schema_type=%7B%22type%22%3A%22object%22%2C%22name%22%3A%22CallToAction%22%2C%22selectedChildName%22%3A%22href%22%7D})
   */
  href({ args = {}, fallback }: { args?: EmptyObject; fallback: string; }): string {
    const props0 = this.getFieldNodeProps("href", { fieldArguments: args });
    const expression0 = props0.expression;

    if (
      expression0 &&
      expression0.type === "StringExpression"
    ) {
      const node = new sdk.StringNode(props0);
      return node.get({ fallback });
    }

    const node = new sdk.StringNode(props0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/4870/main/draft/schema?selected_schema_type=%7B%22type%22%3A%22object%22%2C%22name%22%3A%22CallToAction%22%2C%22selectedChildName%22%3A%22disabled%22%7D})
   */
  disabled({ args = {}, fallback }: { args?: EmptyObject; fallback: boolean; }): boolean {
    const props0 = this.getFieldNodeProps("disabled", { fieldArguments: args });
    const expression0 = props0.expression;

    if (
      expression0 &&
      expression0.type === "BooleanExpression"
    ) {
      const node = new sdk.BooleanNode(props0);
      return node.get({ fallback });
    }

    const node = new sdk.BooleanNode(props0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/4870/main/draft/schema?selected_schema_type=%7B%22type%22%3A%22object%22%2C%22name%22%3A%22CallToAction%22%2C%22selectedChildName%22%3A%22visible%22%7D})
   */
  visible({ args = {}, fallback }: { args?: EmptyObject; fallback: boolean; }): boolean {
    const props0 = this.getFieldNodeProps("visible", { fieldArguments: args });
    const expression0 = props0.expression;

    if (
      expression0 &&
      expression0.type === "BooleanExpression"
    ) {
      const node = new sdk.BooleanNode(props0);
      return node.get({ fallback });
    }

    const node = new sdk.BooleanNode(props0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/4870/main/draft/schema?selected_schema_type=%7B%22type%22%3A%22object%22%2C%22name%22%3A%22CallToAction%22%2C%22selectedChildName%22%3A%22variant%22%7D})
   */
  variant({ args = {}, fallback }: { args?: EmptyObject; fallback: string; }): string {
    const props0 = this.getFieldNodeProps("variant", { fieldArguments: args });
    const expression0 = props0.expression;

    if (
      expression0 &&
      expression0.type === "StringExpression"
    ) {
      const node = new sdk.StringNode(props0);
      return node.get({ fallback });
    }

    const node = new sdk.StringNode(props0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/4870/main/draft/schema?selected_schema_type=%7B%22type%22%3A%22object%22%2C%22name%22%3A%22CallToAction%22%2C%22selectedChildName%22%3A%22icon%22%7D})
   */
  icon({ args = {}, fallback }: { args?: EmptyObject; fallback: string; }): string {
    const props0 = this.getFieldNodeProps("icon", { fieldArguments: args });
    const expression0 = props0.expression;

    if (
      expression0 &&
      expression0.type === "StringExpression"
    ) {
      const node = new sdk.StringNode(props0);
      return node.get({ fallback });
    }

    const node = new sdk.StringNode(props0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }
}

export type Root = {
  callToAction: CallToAction[];
  primaryEmail: string;
  secondaryEmail: string;
  showSearch: boolean;
  showRequestSite: boolean;
  showEmailSubscribe: boolean;
  showLinkToCalendar: boolean;
  showEventForm: boolean;
  availableForWork: boolean;
}

const rootFallback = {callToAction:[],primaryEmail:"",secondaryEmail:"",showSearch:false,showRequestSite:false,showEmailSubscribe:false,showLinkToCalendar:false,showEventForm:false,availableForWork:false};

export class RootNode extends sdk.Node {
  override typeName = "Root" as const;

  getRootArgs(): RootArgs {
    const { step } = this.props;
    return (step?.type === 'GetFieldStep' ? step.fieldArguments : {}) as RootArgs;
  }

  get({ fallback = rootFallback as Root}: { fallback?: Root } = {}): Root {
    const getQuery = null;
    return this.getValue({ query: getQuery, fallback }) as Root;
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/4870/main/draft/logic?selected_field_path=root%3EcallToAction})
   */
  callToAction({ args = {}, listFallbackLength = 0 }: { args?: EmptyObject; listFallbackLength?: number; } = {}): CallToActionNode[] {
    const props0 = this.getFieldNodeProps("callToAction", { fieldArguments: args });

    return new sdk.Node(props0).getItemNodeProps({ fallbackLength: listFallbackLength }).map((props1) => {
      const expression1 = props1.expression;

      if (
        expression1 &&
        expression1.type === "ObjectExpression" &&
        expression1.objectTypeName === "CallToAction"
      ) {
        return new CallToActionNode(props1);
      }
  
      const node = new CallToActionNode(props1);
      node._logUnexpectedTypeError();
      return node;
    });
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/4870/main/draft/logic?selected_field_path=root%3EprimaryEmail})
   */
  primaryEmail({ args = {}, fallback }: { args?: EmptyObject; fallback: string; }): string {
    const props0 = this.getFieldNodeProps("primaryEmail", { fieldArguments: args });
    const expression0 = props0.expression;

    if (
      expression0 &&
      expression0.type === "StringExpression"
    ) {
      const node = new sdk.StringNode(props0);
      return node.get({ fallback });
    }

    const node = new sdk.StringNode(props0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/4870/main/draft/logic?selected_field_path=root%3EsecondaryEmail})
   */
  secondaryEmail({ args = {}, fallback }: { args?: EmptyObject; fallback: string; }): string {
    const props0 = this.getFieldNodeProps("secondaryEmail", { fieldArguments: args });
    const expression0 = props0.expression;

    if (
      expression0 &&
      expression0.type === "StringExpression"
    ) {
      const node = new sdk.StringNode(props0);
      return node.get({ fallback });
    }

    const node = new sdk.StringNode(props0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/4870/main/draft/logic?selected_field_path=root%3EshowSearch})
   */
  showSearch({ args = {}, fallback }: { args?: EmptyObject; fallback: boolean; }): boolean {
    const props0 = this.getFieldNodeProps("showSearch", { fieldArguments: args });
    const expression0 = props0.expression;

    if (
      expression0 &&
      expression0.type === "BooleanExpression"
    ) {
      const node = new sdk.BooleanNode(props0);
      return node.get({ fallback });
    }

    const node = new sdk.BooleanNode(props0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/4870/main/draft/logic?selected_field_path=root%3EshowRequestSite})
   */
  showRequestSite({ args = {}, fallback }: { args?: EmptyObject; fallback: boolean; }): boolean {
    const props0 = this.getFieldNodeProps("showRequestSite", { fieldArguments: args });
    const expression0 = props0.expression;

    if (
      expression0 &&
      expression0.type === "BooleanExpression"
    ) {
      const node = new sdk.BooleanNode(props0);
      return node.get({ fallback });
    }

    const node = new sdk.BooleanNode(props0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/4870/main/draft/logic?selected_field_path=root%3EshowEmailSubscribe})
   */
  showEmailSubscribe({ args = {}, fallback }: { args?: EmptyObject; fallback: boolean; }): boolean {
    const props0 = this.getFieldNodeProps("showEmailSubscribe", { fieldArguments: args });
    const expression0 = props0.expression;

    if (
      expression0 &&
      expression0.type === "BooleanExpression"
    ) {
      const node = new sdk.BooleanNode(props0);
      return node.get({ fallback });
    }

    const node = new sdk.BooleanNode(props0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/4870/main/draft/logic?selected_field_path=root%3EshowLinkToCalendar})
   */
  showLinkToCalendar({ args = {}, fallback }: { args?: EmptyObject; fallback: boolean; }): boolean {
    const props0 = this.getFieldNodeProps("showLinkToCalendar", { fieldArguments: args });
    const expression0 = props0.expression;

    if (
      expression0 &&
      expression0.type === "BooleanExpression"
    ) {
      const node = new sdk.BooleanNode(props0);
      return node.get({ fallback });
    }

    const node = new sdk.BooleanNode(props0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/4870/main/draft/logic?selected_field_path=root%3EshowEventForm})
   */
  showEventForm({ args = {}, fallback }: { args?: EmptyObject; fallback: boolean; }): boolean {
    const props0 = this.getFieldNodeProps("showEventForm", { fieldArguments: args });
    const expression0 = props0.expression;

    if (
      expression0 &&
      expression0.type === "BooleanExpression"
    ) {
      const node = new sdk.BooleanNode(props0);
      return node.get({ fallback });
    }

    const node = new sdk.BooleanNode(props0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }

  /**
   * [Open in Hypertune UI]({@link https://app.hypertune.com/projects/4870/main/draft/logic?selected_field_path=root%3EavailableForWork})
   */
  availableForWork({ args = {}, fallback }: { args?: EmptyObject; fallback: boolean; }): boolean {
    const props0 = this.getFieldNodeProps("availableForWork", { fieldArguments: args });
    const expression0 = props0.expression;

    if (
      expression0 &&
      expression0.type === "BooleanExpression"
    ) {
      const node = new sdk.BooleanNode(props0);
      return node.get({ fallback });
    }

    const node = new sdk.BooleanNode(props0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }
}

/**
 * This is your project schema expressed in GraphQL.
 * 
 * Define `Boolean` fields for feature flags, custom `enum` fields for flags with 
 * more than two states, `Int` fields for numeric flags like timeouts and limits, 
 * `String` fields to manage in-app copy, `Void` fields for analytics events, and 
 * fields with custom object and list types for more complex app configuration, 
 * e.g. to use Hypertune as a CMS.
 * 
 * Once you've changed your schema, set your flag logic in the Logic view.
 */
export type Source = {
  /**
   * You can add arguments to any field in your schema, which you can then use when
   * setting its logic, including the logic of any nested fields. Your root field 
   * already has a `context` argument. Since all flags are nested under the root 
   * field, this context will be available to all of them.
   */
  root: Root;
}

const sourceFallback = {root:{callToAction:[],primaryEmail:"",secondaryEmail:"",showSearch:false,showRequestSite:false,showEmailSubscribe:false,showLinkToCalendar:false,showEventForm:false,availableForWork:false}};

export type GetQueryRootArgs = {
  args: RootArgs;
}

export type GetQueryArgs = {
  root: GetQueryRootArgs;
}

/**
 * This is your project schema expressed in GraphQL.
 * 
 * Define `Boolean` fields for feature flags, custom `enum` fields for flags with 
 * more than two states, `Int` fields for numeric flags like timeouts and limits, 
 * `String` fields to manage in-app copy, `Void` fields for analytics events, and 
 * fields with custom object and list types for more complex app configuration, 
 * e.g. to use Hypertune as a CMS.
 * 
 * Once you've changed your schema, set your flag logic in the Logic view.
 */
export class SourceNode extends sdk.Node {
  override typeName = "Query" as const;

  get({ args, fallback = sourceFallback as Source}: { args: GetQueryArgs; fallback?: Source }): Source {
    const getQuery = sdk.mergeFieldQueryAndArgs(
      query.fragmentDefinitions,
      sdk.getFieldQueryForPath(query.fragmentDefinitions, query.fieldQuery, []), 
      args,
    );
    return this.getValue({ query: getQuery, fallback }) as Source;
  }

  /**
   * You can add arguments to any field in your schema, which you can then use when
   * setting its logic, including the logic of any nested fields. Your root field 
   * already has a `context` argument. Since all flags are nested under the root 
   * field, this context will be available to all of them.
   */
  root({ args }: { args: RootArgs; }): RootNode {
    const props0 = this.getFieldNodeProps("root", { fieldArguments: args });
    const expression0 = props0.expression;

    if (
      expression0 &&
      expression0.type === "ObjectExpression" &&
      expression0.objectTypeName === "Root"
    ) {
      return new RootNode(props0);
    }

    const node = new RootNode(props0);
    node._logUnexpectedTypeError();
    return node;
  }
}

export type DehydratedState = sdk.DehydratedState<Source, VariableValues>
export type CreateSourceOptions = { 
  token: string; 
  variableValues?: VariableValues;
  override?: sdk.DeepPartial<Source> | null;
} & sdk.CreateOptions

export function createSource({
  token,
  variableValues = {},
  override,
  ...options
}: CreateSourceOptions): SourceNode {
  return sdk.create({
    NodeConstructor: SourceNode,
    token,
    query,
    queryId,
    variableValues,
    override,
    options,
  });
}

export const emptySource = new SourceNode({
  context: null,
  logger: null,
  parent: null,
  step: null,
  expression: null,
  initDataHash: null,
});

export function createSourceForServerOnly({
  token,
  variableValues = {},
  override,
  ...options
}: CreateSourceOptions): SourceNode {
  return typeof window === "undefined"
    ? createSource({ token, variableValues, override, ...options })
    : emptySource;
}

/**
 * @deprecated use createSource instead.
 */
export const initHypertune = createSource
/**
 * @deprecated use SourceNode instead.
 */
export type QueryNode = SourceNode;
/**
 * @deprecated use Source instead.
 */
export type Query = Source;
