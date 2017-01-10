module ActAsCsv
  def self.included(base)
    base.extend ClassMethods
  end

  module ClassMethods
    def act_as_csv
      include InstanceMethods
    end
  end

  module InstanceMethods
    def read
      @csv_contents = []
      filename = self.class.to_s.downcase + '.txt'
      file = File.new(filename)
      @headers = file.gets.chomp.split(', ')

      file.each do |row|
        @csv_contents << CsvRow.new(@headers, row)
      end
    end

    def each(&block)
      @csv_contents.each {|row| block.call(row)}
    end

    attr_accessor :headers, :csv_contents

    def initialize
      read
    end
  end

  class CsvRow
    def initialize(headers, rowString)
      @fields = rowString.chomp.split(', ').each_with_index.reduce({}) do |result, (elem, idx)|
        result[headers[idx]] = elem
        result
      end
    end

    attr_accessor :fields

    def method_missing name, *args
      @fields[name.to_s]
    end

    def respond_to?
      true
    end

    def respond_to_missing?
      true
    end
  end
end

class RubyCsv
  include ActAsCsv
  act_as_csv
end

m = RubyCsv.new
m.each { |row| puts row.one }
m.each { |row| puts row.two }
m.each { |row| puts row.three }
