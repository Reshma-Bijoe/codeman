const express = require('express');
const router = express.Router();
const Problem = require('../models/problems.model');
const fs = require('fs');
const { exec } = require("child_process");

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Problem.findById(id).populate('best_author').lean().exec();
        if (!data) {
            return res.status(500).json({ success: false, msg: 'Error Fetching Data' });
        }
        return res.status(200).json({ success: true, data });
    } catch (e) {
        return res.status(500).json({ success: false, msg: 'Error Fetching Data', error: e });
    }
});

router.get('/get/all', async (req, res) => {
    try {
        const data = await Problem.find().populate('best_author').lean().exec();
        data.sort((a, b) => {
            if (a.best_time == null) return 1; // Move undefined/null to last
            if (b.best_time == null) return -1;
            return a.best_time - b.best_time;
        });
        return res.status(200).json({ success: true, data });
    } catch (e) {
        return res.status(500).json({ success: false, msg: 'Error Fetching Data', error: e });
    }
});

router.post('/update', async (req, res) => {
    try {
        const { time, user, problem } = req.body;
        const data = await Problem.findOne({_id: problem}).lean().exec();
        if (data) {
            if (!data.best_time || time < data.best_time) {
                const update = await Problem.findOneAndUpdate({ _id: problem }, { best_author: user, best_time: time });
                return res.status(200).json({ success: true, data: update });
            }
            return res.status(200).json({ success: true, msg: 'nothing to update'});
        } else {
            return res.status(500).json({ success: false, msg: 'Error Fetching Data' });
        }
    } catch (e) {
        return res.status(500).json({ success: false, msg: 'Error Fetching Data', error: e });
    }
});

router.post("/run", (req, res) => {
    const { code, testCases } = req.body;
    const command = process.platform === "win32" ? 'python' : 'python3';

    function wrapUserCode(code) {
        // Ensure function name is always `user_function`
        return code.replace(/def\s+\w+\(/, "def user_function(");
    }

    // Assume `codeFromFrontend` is the Python code sent from the frontend
    const wrappedCode = wrapUserCode(code);
    fs.writeFileSync("user_code.py", wrappedCode);

    // Generate test case execution
    let testCode = `
from user_code import user_function
test_cases = ${JSON.stringify(testCases)}
results = []

for case in test_cases:
    inputs = case["input"]  # Dynamically unpack inputs
    expected = case["expectedOutput"]
    try:
        output = user_function(*inputs) if isinstance(inputs, list) else user_function(inputs)
        results.append(f"Input: {inputs} => Output: {output} | Expected: {expected} | {'✅' if str(output) == str(expected) else '❌'}")
    except Exception as e:
        results.append(f"Input: {inputs} => Error: {str(e)}")

print("\\n".join(results))
`;

    // Write test case execution to a separate file
    fs.writeFileSync("test_runner.py", testCode);

    // Run Python code and return the output
    exec(`${command} test_runner.py`, (error, stdout, stderr) => {
        if (error) {
            return res.json({ error: stderr || error.message });
        }
        return res.json({ output: stdout });
    });
});


module.exports = router;