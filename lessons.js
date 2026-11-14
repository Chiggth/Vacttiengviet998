window.VACT_LESSONS = [
  {
    id: 1, title: "Từ và câu", short: "Từ · Câu · Ngữ pháp", icon: "Aa", pages: "Tài liệu 1 · tr. 4–5, 44+", duration: "18 phút", tags: ["Ngữ pháp", "Nền tảng"],
    summary: "Nhận diện từ trong ngữ cảnh và xác định đúng nòng cốt câu.", concepts: ["Từ và cấu tạo từ", "Từ loại trong ngữ cảnh", "Thành phần câu"],
    theory: [
      ["Từ và cấu tạo từ", "Từ là đơn vị nhỏ nhất có nghĩa, dùng để tạo câu. Xét cấu tạo, từ có thể là từ đơn hoặc từ phức; từ phức gồm từ ghép và từ láy. Khi phân loại, hãy thử tách các tiếng và kiểm tra quan hệ nghĩa giữa chúng."],
      ["Từ loại và sắc thái", "Danh từ gọi tên sự vật/khái niệm; động từ chỉ hoạt động/trạng thái; tính từ chỉ đặc điểm. Nghĩa và chức năng của một từ có thể đổi theo ngữ cảnh, vì vậy không nên chỉ nhìn hình thức."],
      ["Nòng cốt và thành phần phụ", "Câu thường có chủ ngữ nêu đối tượng và vị ngữ nêu hoạt động, trạng thái hay đặc điểm. Trạng ngữ bổ sung hoàn cảnh; khởi ngữ nêu đề tài; tình thái từ và cảm thán thể hiện thái độ."],
    ], example: { prompt: "Phân tích thành phần câu: “Vì trời mưa, trận đấu bị hoãn.”", answer: "“Vì trời mưa” là trạng ngữ chỉ nguyên nhân; “trận đấu” là chủ ngữ; “bị hoãn” là vị ngữ.", tip: "Tìm cụm chủ–vị trước, rồi xét phần bổ sung ở đầu câu." },
    question: { stem: "Trong câu “Sáng nay, lớp mình thảo luận về truyện ngắn”, cụm nào là trạng ngữ?", options: ["Sáng nay", "lớp mình", "thảo luận", "về truyện ngắn"], answer: 0, explain: "“Sáng nay” cho biết thời gian diễn ra hoạt động nên là trạng ngữ." }
  },
  {
    id: 2, title: "Văn bản & biện pháp tu từ", short: "Đọc văn bản · Tu từ", icon: "¶", pages: "Tài liệu 2 · tr. 23, 42+", duration: "22 phút", tags: ["Đọc hiểu", "Ngôn ngữ"],
    summary: "Theo dõi mạch lập luận, nhận ra tu từ và giải thích tác dụng bằng căn cứ.", concepts: ["Chủ đề và mạch ý", "Thao tác lập luận", "Biện pháp tu từ"],
    theory: [
      ["Đọc mạch văn bản", "Đề tài là phạm vi được nói tới; chủ đề là ý nghĩa trung tâm. Hãy tìm câu nêu vấn đề, các ý hỗ trợ và quan hệ giữa chúng để hiểu bố cục, thay vì đọc từng câu rời rạc."],
      ["Thao tác lập luận", "Giải thích làm rõ khái niệm; phân tích chia đối tượng thành phương diện; chứng minh dùng lí lẽ và dẫn chứng; bình luận đánh giá; so sánh làm rõ tương đồng/khác biệt; bác bỏ chỉ ra điểm không đúng."],
      ["Nhận diện tu từ", "So sánh dựa trên nét tương đồng; nhân hóa gán nét người cho vật; ẩn dụ gọi tên bằng nét tương đồng; hoán dụ dựa trên quan hệ gần gũi; điệp nhấn nhịp và ý. Luôn giải thích tác dụng trong đúng ngữ cảnh."],
    ], example: { prompt: "“Thành phố thức dậy trong tiếng còi tàu.” Hình ảnh nào được nhân hóa?", answer: "“Thức dậy” gán hoạt động của con người cho thành phố, gợi một nhịp sống đang bắt đầu.", tip: "Nêu dấu hiệu → nghĩa trong câu → cảm xúc hoặc ý được nhấn mạnh." },
    question: { stem: "Thao tác lập luận nào chủ yếu dùng dẫn chứng để làm sáng tỏ nhận định?", options: ["Giải thích", "Chứng minh", "Bình luận", "Bác bỏ"], answer: 1, explain: "Chứng minh dùng lí lẽ và dẫn chứng xác thực để làm sáng tỏ một nhận định." }
  },
  {
    id: 3, title: "Văn học dân gian", short: "Dân gian · Thể loại", icon: "❋", pages: "Tài liệu 3 · tr. 30–37", duration: "20 phút", tags: ["Văn học", "Thể loại"],
    summary: "Phân biệt thể loại dân gian qua mục đích, mô típ và cách lưu truyền.", concepts: ["Đặc trưng dân gian", "Thể loại tự sự", "Thơ ca dân gian"],
    theory: [
      ["Đặc trưng chung", "Văn học dân gian do nhân dân sáng tác và lưu truyền chủ yếu bằng lời nói; có tính tập thể, dị bản và gắn với sinh hoạt cộng đồng. Tác phẩm lưu giữ cách cảm, cách nghĩ và kinh nghiệm của nhiều thế hệ."],
      ["Các thể loại tự sự", "Thần thoại dùng trí tưởng tượng để lý giải thế giới; truyền thuyết gắn với lịch sử và nhân vật được cộng đồng tôn vinh; cổ tích thường kể số phận, ước mơ công bằng; ngụ ngôn mượn chuyện để nêu bài học."],
      ["Ca dao và tục ngữ", "Ca dao thiên về tiếng nói trữ tình, tình cảm; tục ngữ cô đọng kinh nghiệm, nhận xét của dân gian. Khi đọc thơ ca, chú ý hình ảnh quen thuộc, nhịp, vần và chủ thể trữ tình."],
    ], example: { prompt: "Một truyện giải thích nguồn gốc sấm sét bằng hành động của thần linh thường thuộc thể loại nào?", answer: "Thần thoại: thể loại dùng thế giới thần linh và trí tưởng tượng dân gian để lý giải hiện tượng tự nhiên.", tip: "Tách mục đích lý giải tự nhiên khỏi mục đích ghi nhớ sự kiện lịch sử." },
    question: { stem: "Thể loại nào thường mượn câu chuyện để gửi gắm một bài học hoặc lời răn?", options: ["Ngụ ngôn", "Thần thoại", "Sử thi", "Ca dao"], answer: 0, explain: "Ngụ ngôn mượn câu chuyện, thường ngắn gọn, để gửi gắm bài học hoặc lời răn." }
  },
  {
    id: 4, title: "Văn học trung đại", short: "Trung đại · Tác giả", icon: "文", pages: "Tài liệu 4 · tr. 13–18+", duration: "24 phút", tags: ["Văn học", "Lịch sử"],
    summary: "Kết nối bối cảnh, thể loại và cảm hứng lớn của văn học trung đại.", concepts: ["Bối cảnh và chữ viết", "Cảm hứng chủ đạo", "Thể loại tiêu biểu"],
    theory: [
      ["Bối cảnh và diện mạo", "Văn học trung đại hình thành trong xã hội phong kiến, giao thoa tư tưởng Nho–Phật–Đạo. Văn học chữ Hán và chữ Nôm cùng phát triển; sáng tác bác học đối thoại với vốn văn học dân gian."],
      ["Cảm hứng lớn", "Lòng yêu nước, ý thức dân tộc, tư tưởng nhân đạo và suy ngẫm thế sự là những mạch cảm hứng quan trọng. Tác phẩm vừa kế thừa quy phạm vừa thể hiện tiếng nói riêng của tác giả."],
      ["Nhận diện thể loại", "Thơ Đường luật chú ý niêm, luật, vần và phép đối; truyện truyền kỳ kết hợp chuyện lạ với suy ngẫm về hiện thực; ngâm khúc giàu tiếng nói trữ tình; truyện thơ Nôm thường kết hợp tự sự với thơ lục bát."],
    ], example: { prompt: "Khi thấy hai cặp câu giữa trong một bài thơ luật đối nhau, nên kiểm tra điều gì?", answer: "Kiểm tra phép đối và niêm luật, rồi đọc hình ảnh, từ ngữ để tìm ý nghĩa và tư tưởng.", tip: "Hình thức thể loại giúp mở đường phân tích, không thay thế phần đọc nghĩa." },
    question: { stem: "Đặc điểm nào thường gắn với truyện thơ Nôm?", options: ["Kết hợp tự sự với thơ, thường dùng lục bát", "Chỉ ghi chép sự kiện bằng văn xuôi", "Không có nhân vật hay cốt truyện", "Chỉ sử dụng thơ Đường luật"], answer: 0, explain: "Truyện thơ Nôm kể chuyện bằng thơ, phổ biến nhất là thể lục bát." }
  },
  {
    id: 5, title: "Văn học Việt Nam hiện đại", short: "Hiện đại · Trào lưu", icon: "✎", pages: "Tài liệu 4–5 · tr. 74; 1–3", duration: "23 phút", tags: ["Văn học", "Trào lưu"],
    summary: "Nhận diện đổi mới thể loại và phân biệt lãng mạn với hiện thực phê phán.", concepts: ["Đổi mới văn học", "Lãng mạn", "Hiện thực phê phán"],
    theory: [
      ["Chuyển động hiện đại", "Văn học hiện đại đổi mới cách viết và thể loại, chuyển dần sang chữ Quốc ngữ, chú ý cá nhân và những biến động xã hội. Bối cảnh lịch sử tạo nên các giai đoạn và tiếng nói nghệ thuật khác nhau."],
      ["Khuynh hướng lãng mạn", "Đề cao cái tôi, cảm xúc, khát vọng và trí tưởng tượng; thường hướng tới lý tưởng hoặc thế giới giàu chất mộng. Khi phân tích, chú ý giọng điệu và cách nhân vật nhìn thế giới."],
      ["Hiện thực phê phán", "Quan sát đời sống cụ thể, kể cả những mặt bất công và những phận người nhỏ bé; qua đó đặt ra câu hỏi xã hội. Không thể nhận diện chỉ bằng đề tài: cần xem cách hiện thực được lựa chọn và đánh giá."],
    ], example: { prompt: "Một bài thơ tập trung vào cái tôi cô đơn, khát vọng tình yêu và hình ảnh thiên nhiên mộng tưởng thường gần khuynh hướng nào?", answer: "Khuynh hướng lãng mạn, do nhấn mạnh cái tôi cá nhân, cảm xúc và trí tưởng tượng.", tip: "Dựa vào cách cảm nhận hiện thực, không chỉ dựa trên việc tác phẩm có nhắc đến thiên nhiên." },
    question: { stem: "Dấu hiệu nào phù hợp nhất với khuynh hướng hiện thực phê phán?", options: ["Phơi bày bất công qua đời sống và số phận cụ thể", "Chỉ tập trung vào mộng tưởng cá nhân", "Tránh mọi chi tiết xã hội", "Chỉ dùng hình ảnh thần kỳ"], answer: 0, explain: "Khuynh hướng hiện thực phê phán đi sâu vào đời sống cụ thể và cho thấy những bất công, bi kịch xã hội." }
  },
  {
    id: 6, title: "Phong cách ngôn ngữ", short: "Nghệ thuật · Báo chí", icon: "≋", pages: "Tài liệu 6 · tr. 1–3", duration: "16 phút", tags: ["Tiếng Việt", "Nhận diện"],
    summary: "Nhìn vào mục đích giao tiếp, từ ngữ và hình thức để nhận diện phong cách.", concepts: ["Ngôn ngữ nghệ thuật", "Ngôn ngữ báo chí", "Dấu hiệu nhận diện"],
    theory: [
      ["Phong cách nghệ thuật", "Dùng trong thơ, truyện, kịch và các văn bản văn chương. Bên cạnh chức năng thông tin, ngôn ngữ có chức năng thẩm mỹ; thường giàu hình ảnh, cảm xúc, tính hình tượng và biến đổi linh hoạt theo thể loại."],
      ["Phong cách báo chí", "Dùng trong báo nói và báo viết, với bản tin, phóng sự, tiểu phẩm… Mục đích thường là đưa tin thời sự, phản ánh vấn đề xã hội; văn bản có xu hướng ngắn gọn, rõ dữ kiện và hấp dẫn."],
      ["Cách xác định", "Kết hợp mục đích, đối tượng, lớp từ, cú pháp và hình thức. Một bài báo có thể giàu hình ảnh hoặc một tác phẩm có thông tin, nên hãy tìm phong cách chủ đạo bằng các dấu hiệu cùng xuất hiện."],
    ], example: { prompt: "“Sáng 12/5, cầu An Bình thông xe sau 18 tháng thi công.” Dấu hiệu nào gợi phong cách báo chí?", answer: "Câu nêu thời gian, sự kiện và dữ kiện cụ thể bằng cách diễn đạt trực tiếp.", tip: "Dẫn một hoặc hai dấu hiệu từ câu làm căn cứ cho kết luận." },
    question: { stem: "Chức năng nổi bật bên cạnh thông tin của ngôn ngữ nghệ thuật là gì?", options: ["Thẩm mỹ, khơi gợi cảm xúc", "Chỉ dẫn thao tác kỹ thuật", "Ghi dữ kiện hành chính", "Ra lệnh và điều hành"], answer: 0, explain: "Ngôn ngữ nghệ thuật biểu hiện cái đẹp và khơi gợi, nuôi dưỡng cảm xúc người đọc." }
  },
  {
    id: 7, title: "Hình tượng & thông điệp", short: "Thơ · Truyện · Suy luận", icon: "◉", pages: "Tài liệu 7 · kho câu hỏi đọc hiểu", duration: "19 phút", tags: ["Đọc văn học", "Suy luận"],
    summary: "Giải mã hình ảnh, chi tiết và thông điệp có căn cứ trong văn bản.", concepts: ["Hình ảnh biểu tượng", "Chi tiết nghệ thuật", "Thông điệp"],
    theory: [
      ["Từ hình ảnh đến biểu tượng", "Một hình ảnh có thể vừa tả thực vừa gợi nghĩa rộng hơn. Đặt hình ảnh trong hoàn cảnh, mạch cảm xúc và các từ ngữ xung quanh để nhận ra lớp nghĩa biểu tượng."],
      ["Vai trò của chi tiết", "Chi tiết có thể mở nút thắt, bộc lộ tính cách, làm thay đổi diễn biến hoặc tập trung chủ đề. Hãy hỏi: nó xuất hiện lúc nào, tác động ra sao, nếu bỏ đi thì ý nghĩa nào mất?"],
      ["Rút ra thông điệp", "Thông điệp là điều văn bản muốn người đọc suy ngẫm. Câu trả lời cần khái quát nhưng vẫn neo vào hình ảnh, hành động hoặc kết thúc cụ thể; tránh suy diễn vượt khỏi dữ kiện."],
    ], example: { prompt: "Trong thơ về người mở đường, “ngọn lửa” vừa có thể là vật thật vừa gợi điều gì?", answer: "Tùy mạch thơ, nó có thể gợi lòng yêu nước, ý chí và sự hy sinh; căn cứ vào hành động và hoàn cảnh của nhân vật trữ tình.", tip: "Trả lời theo ba nhịp: dấu hiệu → nghĩa trong ngữ cảnh → chủ đề." },
    question: { stem: "Cách nào chắc nhất để giải thích một hình ảnh có ý nghĩa biểu tượng?", options: ["Đặt hình ảnh trong mạch văn bản và căn cứ vào chi tiết quanh nó", "Chọn ý nghĩa quen thuộc nhất của hình ảnh", "Tách hình ảnh khỏi hoàn cảnh sáng tác", "Nêu cảm giác cá nhân mà không dẫn căn cứ"], answer: 0, explain: "Nghĩa biểu tượng phải được nâng đỡ bởi mạch cảm xúc, hoàn cảnh và các chi tiết trong văn bản." }
  },
  {
    id: 8, title: "Văn bản thông tin & nghị luận", short: "Luận điểm · Dữ kiện", icon: "▧", pages: "Tài liệu 8 · kho câu hỏi đọc hiểu", duration: "21 phút", tags: ["Đọc hiểu", "Lập luận"],
    summary: "Tách luận điểm, dữ kiện, quan hệ logic và thái độ của người viết.", concepts: ["Luận điểm và dẫn chứng", "Nguyên nhân–kết quả", "Thái độ tác giả"],
    theory: [
      ["Bản đồ lập luận", "Tìm vấn đề, luận điểm chính, các ý hỗ trợ và bằng chứng. Một dẫn chứng minh họa cho luận điểm; nó không tự động chứng minh mọi kết luận rộng hơn."],
      ["Theo dõi quan hệ logic", "Phân biệt nguyên nhân, biểu hiện, hệ quả và giải pháp. Các từ nối, trình tự thông tin và quan hệ giữa các câu cho biết lập luận đang tiến triển theo hướng nào."],
      ["Thái độ và suy luận", "Từ ngữ đánh giá, giọng điệu và cách chọn dẫn chứng thể hiện thái độ. Với câu suy luận, chọn kết luận được dữ kiện nâng đỡ; loại phương án trái văn bản, quá rộng hoặc chỉ đúng một phần."],
    ], example: { prompt: "Đoạn viết nêu quy định giảm phát thải, áp lực chi phí và giải pháp dùng năng lượng sạch. Quan hệ nào hợp lý?", answer: "Áp lực chính sách và thị trường thúc đẩy doanh nghiệp chuyển đổi; giải pháp là hướng ứng phó chứ chưa đủ căn cứ để nói mọi thách thức đã được giải quyết.", tip: "Đối chiếu từng phương án với câu chứa căn cứ, đừng bổ sung giả định." },
    question: { stem: "Khi câu hỏi yêu cầu suy luận từ một đoạn thông tin, nên chọn phương án nào?", options: ["Kết luận được các dữ kiện trong đoạn nâng đỡ", "Kết luận hấp dẫn nhưng không được nhắc đến", "Ý kiến cá nhân rộng hơn chủ đề", "Phương án có nhiều chi tiết nhất"], answer: 0, explain: "Suy luận đúng phải dựa trên văn bản và không mở rộng quá xa dữ kiện." }
  }
];
