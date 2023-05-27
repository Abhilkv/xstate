
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.LoadingData.Loaded:invocation[0]": { type: "done.invoke.LoadingData.Loaded:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.LoadingData.Loading:invocation[0]": { type: "done.invoke.LoadingData.Loading:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.LoadingData.Loaded:invocation[0]": { type: "error.platform.LoadingData.Loaded:invocation[0]"; data: unknown };
"error.platform.LoadingData.Loading:invocation[0]": { type: "error.platform.LoadingData.Loading:invocation[0]"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "loadinfDataService": "done.invoke.LoadingData.Loaded:invocation[0]" | "done.invoke.LoadingData.Loading:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: "loadinfDataService";
        };
        eventsCausingActions: {
          "logError": "error.platform.LoadingData.Loaded:invocation[0]" | "error.platform.LoadingData.Loading:invocation[0]";
"storeData1": "DATA_LOADED";
"storeDetails": "done.invoke.LoadingData.Loaded:invocation[0]" | "done.invoke.LoadingData.Loading:invocation[0]";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "loadinfDataService": "DATA_LOADED" | "done.invoke.LoadingData.Loaded:invocation[0]" | "done.invoke.LoadingData.Loading:invocation[0]" | "xstate.init";
        };
        matchesStates: "Loaded" | "Loading" | "LoadingFailed";
        tags: never;
      }
  