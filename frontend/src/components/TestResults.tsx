
import React from 'react';

interface TestCase {
  id: number;
  name: string;
  status: 'pass' | 'fail' | 'running';
  message?: string;
}

interface TestResultsProps {
  testCases: TestCase[];
  isRunning: boolean;
}

const TestResults = ({ testCases, isRunning }: TestResultsProps) => {
  if (isRunning) {
    return (
      <div className="test-results">
        <div className="test-result-item">
          <span>Running tests...</span>
        </div>
      </div>
    );
  }

  if (testCases.length === 0) {
    return (
      <div className="test-results">
        <div className="test-result-item">
          <span>Run tests to see results</span>
        </div>
      </div>
    );
  }

  return (
    <div className="test-results">
      {testCases.map((testCase) => (
        <div key={testCase.id} className="test-result-item">
          {testCase.status === 'pass' ? (
            <span className="test-pass">✓</span>
          ) : testCase.status === 'fail' ? (
            <span className="test-fail">✕</span>
          ) : (
            <span>⟳</span>
          )}
          <span>{testCase.name}</span>
          {testCase.message && (
            <span className="test-fail"> - {testCase.message}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default TestResults;
