# num_one = int(input())
# num_two = int(input())

# if num_one < num_two and num_two % 5 == 0:
#     by_five_range = range(num_one, num_two, 5)
#     for i in by_five_range:
#         print(f'{i}', end=' ')
#     print(f'{num_two}', end=' \n')
# elif num_one < num_two:
#     by_five_range = list(range(num_one, num_two, 5))
#     print(f'{by_five_range} \n', end='')
# if num_one > num_two:
#     print("Second integer can't be less than the first.")
        
# elif num_one == num_two:
#     print(f'{num_two} ')

#========================================================

# user_one = {'first_name': 'robert', 'last_name': 'ward'}
# users = [{'first_name': 'alex', 'last_name': 'ward'}, user_one]

# for user in users:
#     for key, value in user.items():
#         print(key, value)

#========================================================

        




i = 3
while i < 18:
    j = 2
    while j <= 7:
        print(f'{i}{j}')
        j = j + 4
    i = i + 14