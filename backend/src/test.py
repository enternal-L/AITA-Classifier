from classifier import classify

pair = classify('''I maximum pulsed an innocent family of four''')
print(f"P(NTA) = {pair[0]}, P(YTA) = {pair[1]}")