# Vindictus Of Partholon Vanguard

## Arrange Teammate

Vindictus has a system named Partholon Vanguard which
provides player to gain relic boxes and antiquity points
to exchange items.

Partholon Vanguard lists `missions` missions, each mission
has `difficulty`, fit `specialties`, maximum of
`hero slots` to join and `grand discovery points`.

Grand discovery point is the requirement of gaining bonus.
It affects the probability of gaining bonus. You have to
gain more points as you can to increase the probability.

Here is the point rule as below:

- Gain 10 points for first hero joined
- Gain 5 points for second and third hero joined
- Gain 3 extra points per fit specialty of hero joined
- Each specialty of mission can ONLY gain extra points once
- You can't gain points over `grand discovery points` for each mission

Note:

- The difficulty of mission affect gaining points of first hero joined. For example, the mission of difficulty `2` allows two heroes to join. If all heroes are not fitting any specialty, the total points is 17(first hero joined + difficulty + second hero joined = 10 + 2 + 5).
- Each mission limits the maximum number of hero to join

Now, you have `heroes` heroes to join missions,
each hero has 5 specialties.

Given `missions` and `heroes`, return joined indices
of hero for missions to maximize the total
probability of gaining bonus.

Example 1:

```text
Input: missions = [
           {
               "difficulty": 0,
               "specialties": ["A", "B", "C"],
               "character_slots": 3,
               "grand_discovery_points": 30
           }, {
               "difficulty": 0,
               "specialties": ["B", "D", "F"],
               "character_slots": 1,
               "grand_discovery_points": 40
           }
       ]
       heroes = [
           ["A", "E", "F", "G", "I"],
           ["C", "D", "E", "F", "G"],
           ["C", "D", "E", "G", "H"]
       ]
Output: [[0, 2], [1]]
Explanation: First mission gains 21 points(first hero joined + second hero joined + fit specialties = 10+5+2*3) while second mission gains 16 points(first hero joined + fit specialties = 10+2*3). The total of probability is 21/30 + 16/40 = 1.1.
```

Example 2:

```text
Input: missions = [
           {
               "difficulty": -2,
               "specialties": ["A", "B", "C"],
               "character_slots": 3,
               "grand_discovery_points": 25
           }, {
               "difficulty": 2,
               "specialties": ["B", "D", "F"],
               "character_slots": 1,
               "grand_discovery_points": 100
           }
       ]
       heroes = [
           ["A", "C", "G", "I", "J"],
           ["B", "C", "E", "G", "H"]
       ]
Output: [[0, 1], []]
Explanation: First mission gains 22 points(first hero joined + mission difficulty + second hero joined + fit specialties = 10+(-2)+5+3*3) while second mission gains 0 points. The total of probability is 22/25 + 0/100 = 0.88.
```

Example 3:

```text
Input: missions = [
           {
               "difficulty": 2,
               "specialties": ["A", "B", "C"],
               "character_slots": 3,
               "grand_discovery_points": 30
           }
       ]
       heroes = [
           ["A", "C", "G", "I", "J"],
           ["B", "C", "E", "G", "H"],
           ["C", "G", "I", "J", "K"]
       ]
Output: [[0, 1, 2]]
Explanation: The mission gains 31 points(first hero joined + mission difficulty + second hero joined + third hero joined + fit specialties = 10+2+5+5+3*3), but the limitation of points is 30, the actual points are 30. The total of probability is 30/30 = 1.
```

Constraints:

- 1 <= missions.length <= 5
- mission[i].difficulty is one of [-2, 0, 2]
- missions[i].specialties.length == 3
- missions[i].specialties consists `unique` value
- 1 <= missions[i].character_slots <= 3
- 20 <= missions[i].grand_discovery_points <= 100
- 1 <= heroes.length <= 27
- heroes[i].length == 5
- heroes[i] consists `unique` value
- The number of specialties is about 42

## Character

| Character | English | Specialties |
| --- | --- | --- |
| 利斯塔 | Lethita | </br></br></br></br> |
| 菲歐娜 | Fiona | </br></br></br></br> |
| 依菲 | Evy | 占星術</br>深沉之心</br>遠程射擊</br>淨化一擊</br>元素魔法師 |
| 卡魯 | Kalok | </br></br></br></br>無畏巨人 |
| 凱 | Kay | </br></br></br></br> |
| 薇拉 | Vella | </br></br></br></br> |
| 赫克 | Hurk | 航海術</br>堅韌耐性</br>超凡之勢</br>巨型武器</br>浪人劍客 |
| 玲 | Lynn | 華麗身世</br>止水月步</br>神出鬼沒</br>淨化一擊</br>花瓣誓言 |
| 艾瑞莎 | Arisha | 闇之明瞳</br>野生動物知識</br>神出鬼沒</br>先發制人</br>時空支配者 |
| 赫基 | Hagie | </br></br></br></br> |
| 蒂莉亞 | Delia | 華麗身世</br>堅韌耐性</br>鋒利之刃</br>巨型武器</br>信念守護者 |
| 彌莉 | Miri | </br></br></br></br> |
| 葛嵐頓 | Grimden | </br></br></br></br> |
| 繆兒 | Miul | 航海術</br>深沉之心</br>神出鬼沒</br>遠程射擊</br>空間魔女 |
| 蓓爾 | Bel | 鐵胃</br>止水月步</br>先發制人</br>巨型武器</br>時間的漂流者 |
| 璃朔 | Lethor | 占星術</br>卓越平衡</br>謹慎戰術</br>連續打擊</br>黎明氏族 |
| 凱爾 | Kael | 華麗身世</br>堅韌耐性</br>鋒利之刃</br>連續打擊</br>正義使者 |
| 泰莎 | Tessa | 卓越平衡</br>闇之明瞳</br>連續打擊</br>復仇之影</br>愛恨交織的獵人 |
| 丹雅 | Danah | 占星術</br>堅韌耐性</br>神出鬼沒</br>淨化一擊</br>靈魂武士 |
| 蕾媞 | Letty | 航海術</br>卓越平衡</br>遠程射擊</br>巨型武器</br>爆炸愛好者 |
| 拉緹雅 | Latiya | 止水月步</br>野生動物知識</br>謹慎戰術</br>巨型武器</br>高潔的獵人 |
| 泫兒 | Czern | 占星術</br>深沉之心</br>謹慎戰術</br>遠程射擊</br>黎明魔女 |

## Vocabulary

| Chinese | English |
| --- | --- |
| 任務 | Mission |
| 特性 | Specialties |
| 角色 | Character |
| 難度 | Difficulty |
| 大發現的額外獎勵 | Grand Discovery Bonus |
| 冒險夥伴 | Pet |

## Reference

- [Vindictus Wiki](https://vindictus.fandom.com/wiki/Partholon_Vanguard)
