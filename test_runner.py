
from user_code import user_function
test_cases = [{"input":[1,2],"expectedOutput":3},{"input":[5,7],"expectedOutput":12},{"input":[-3,8],"expectedOutput":5}]
results = []

for case in test_cases:
    inputs = case["input"]  # Dynamically unpack inputs
    expected = case["expectedOutput"]
    try:
        output = user_function(*inputs)
        results.append(f"Input: {inputs} => Output: {output} | Expected: {expected} | {'✅' if str(output) == str(expected) else '❌'}")
    except Exception as e:
        results.append(f"Input: {inputs} => Error: {str(e)}")

print("\n".join(results))
