Got bored, have divergence.  

The worldline is calculated the following way:
1. Get current IP address
2. Split it into 4 parts, padded with 0s to 3 digits each
3. Rejoin the parts into a single string
4. Get every odd and even character from the string and add the resulting strings together
5. Get the current time in epoch seconds, trimmed to 6 digits
6. Add the two strings together, with slight randomization

Spat this out in like an hour or something, off and on.