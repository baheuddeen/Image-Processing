import {
  DisplayProcessor,
  SpecReporter,
  StacktraceOption,
} from 'jasmine-spec-reporter';
type SuiteInfo = jasmine.JasmineStartedInfo;

class CustomProcessort extends DisplayProcessor {
  displayJasmineStarted(info: SuiteInfo, log: string) {
    return `${log}`;
  }
}
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayStacktrace: StacktraceOption.NONE,
    },
    customProcessors: [CustomProcessort],
  })
);
